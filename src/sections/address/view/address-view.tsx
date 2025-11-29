'use client';
import React, { use, useEffect } from 'react';
import AddressModal from '@/components/address/address-modal'; 
import { addresses } from '../data/address';
import { IAddress, IAddressCreate, IAddressUpdate } from '@/interfaces/address';
import { createAddress, deleteAddress, getAddresses, updateAddress } from '@/apis/address';
import { cp } from 'fs';
import { SplashScreen } from '@/components/loading';

export default function AddressPage() {
  const [addressList, setAddressList] = React.useState<IAddress[] | undefined>(undefined);
  const [addressToEdit, setAddressToEdit] = React.useState<IAddress | null>(null);
  const [addressToDelete, setAddressToDelete] = React.useState<IAddress | null>(null);
  const [loading, setLoading] = React.useState(true);

  const fetchAddresses = async () => {
    setLoading(true);
    try {
      const response = await getAddresses();
      console.log('Fetched addresses:', response);
      setAddressList(response.data);
    } catch (error) {
      console.error('Error fetching addresses:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleIsDefault = async (id: string) => {
    setLoading(true);
    try {
      const updatedAddress : IAddressUpdate = {
        isDefault: true,
      }

      const response = await updateAddress(id, updatedAddress);
      if (response){
        fetchAddresses()
      }
    } catch (err) {
      console.error('Error update addresses: ', err);
    } finally {
      setLoading(false)
    }
  }

  const handleOpenDeleteModal = async (address: IAddress) => {
    setAddressToDelete(address);
    (document.getElementById('delete_address_modal') as HTMLDialogElement)?.showModal();
  }

  const handleConfirmDelete = async () => {
    if (!addressToDelete) return;
    setLoading(true);
    try {
      const response = await deleteAddress(addressToDelete.id);
      if (response){
        fetchAddresses()
        setAddressToDelete(null);
      }
    } catch (err) {
      console.error('Error deleting address: ', err);
    } finally {
      setLoading(false)
    }

    (document.getElementById('delete_address_modal') as HTMLDialogElement)?.close();
    setAddressToDelete(null);
  }

  const handleAddressSubmit = async (addressId: string, address: IAddressCreate | IAddressUpdate, type: 'add' | 'edit') => {
    setLoading(true);
    if (type === 'add'){
      try {
        const response = await createAddress(address as IAddressCreate);
        if (response) {
          fetchAddresses()
        }
      } catch(err) {
        console.error('error add new address: ', err)
      } finally {
        setLoading(false);
      }
    } else if (type === 'edit') {
      try {
        const response = await updateAddress(addressId, address as IAddressUpdate);
        if (response) {
          fetchAddresses()
        }
      } catch(err) {
        console.error('error updating address: ', err)
      } finally {
        setLoading(false);
      }
    }
  }

  React.useEffect(() => {
    console.log('Updated address list:', addressList);
    fetchAddresses();
  }, []);

  const openModal = (id: string, address?: IAddress, type?: 'add' | 'edit') => {
    console.log('Opening modal:', id, address, type);
    (document.getElementById(id) as HTMLDialogElement)?.showModal();
    if (type === 'edit' && address) {
      setAddressToEdit(address);
    }
  };

  if (loading) {
    return <SplashScreen className='h-[80vh]'/>
  }

  return (
    <div className='w-full flex flex-col'>
      <div className="flex flex-row justify-between items-center mb-6 border-b pb-4">
        <h1 className="text-2xl font-bold">My Addresses</h1>
        <button 
          className="btn btn-neutral"
          onClick={() => openModal('add_address_modal')}
        >
          Add New Address
        </button>
      </div>

      <div className="space-y-6">
        {addressList?.map((addr) => (
          <div key={addr.id} className="border-b py-4 grid grid-cols-3 gap-4">
            
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-2">
                <span className="font-bold text-lg">{addr.fullName}</span>
                <div className="divider divider-horizontal m-0"></div>
                <span className="text-gray-500">{addr.phone}</span>
              </div>

              <p className="text-gray-600">{addr.streetAdress}</p>
              <p className="text-gray-600 mb-2">{addr.cityProvince}</p>

              {addr.isDefault && (
                <span className="badge badge-primary badge-outline">Default</span>
              )}
            </div>

            <div className="col-span-1 text-right">
              <div className="flex justify-end space-x-2 mb-2">
                {!addr.isDefault && ( 
                    <button 
                    className="link link-primary"
                    onClick={() => openModal('update_address_modal', addr, 'edit')} 
                    >
                    Edit
                    </button>
                )}
                <button 
                  className="link link-error"
                  onClick={() => handleOpenDeleteModal(addr)}
                >
                  Delete
                </button>
              </div>
              {!addr.isDefault && (
                <button 
                    className="btn btn-xs btn-outline"
                    onClick={() => handleIsDefault(addr.id)}
                    >
                  Set as Default
                </button>
              )}
            </div>
          </div>
        ))}
        
        {addresses.length === 0 && (
          <p className="text-gray-500 text-center py-10">
            You have no saved addresses.
          </p>
        )}
      </div>

      <AddressModal modalId="add_address_modal" type="add" onSubmit={handleAddressSubmit} />
      <AddressModal modalId="update_address_modal" type="edit" address={addressToEdit} onSubmit={handleAddressSubmit} />
      <dialog id="delete_address_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirm delete!</h3>
          <p className="py-4">
            Are you sure you want to delete the address?
            <br />
            <strong className="text-error">{addressToDelete?.streetAdress}, {addressToDelete?.cityProvince}</strong>?
            <br/>
            This action cannot be undone.
          </p>
          <div className="modal-action">
            <form method="dialog"><button className="btn" onClick={() => setAddressToDelete(null)}>Cancel</button></form>
            <button className="btn btn-error" onClick={handleConfirmDelete}>Delete</button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop"><button onClick={() => setAddressToDelete(null)}>close</button></form>
      </dialog>
    </div>
  );
}