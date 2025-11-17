'use client'
import { updateUserProfile } from "@/apis/user";
import EmailChangeModal from "@/components/email/email-popup";
import ClipboardRegular from "@/components/icons/clipboard";
import EditRegular from "@/components/icons/edit";
import HeartRegular from "@/components/icons/heart";
import PenRegular from "@/components/icons/pen";
import UserRegula from "@/components/icons/user";
import VoucherRegular from "@/components/icons/voucher";
import DebounceInput from "@/components/input/debounce-input";
import PhoneChangeModal from "@/components/phone/phone-popup";
import { useUserProfile } from "@/context/user-context";
import { IUserProfile } from "@/interfaces/user";
import Image from "next/image";
import React, { use } from "react";

export default function ProfileView() {
    const { userProfile, setUserProfile} = useUserProfile()
    const [fullName, setFullName] = React.useState<string>(userProfile?.fullName ?? '');
    const [email, setEmail] = React.useState<string>(userProfile?.email ?? '');
    const [phone, setPhone] = React.useState<string>(userProfile?.phone ?? '');
    const [gender, setGender] = React.useState<string>(userProfile?.gender ?? '');
    const [avatarUrl, setAvatarUrl] = React.useState<string>(userProfile?.avatar ?? '/default-avatar.jpg');
    const [avatarFile, setAvatarFile] = React.useState<File | null>(null);

    const hideEmail = (email: string) => {
        const parts = email.split('@');
        if (parts.length !== 2) return email;
        const namePart = parts[0];
        const domainPart = parts[1];
        const hiddenName = namePart.length <= 2 ? namePart[0] + '*' : namePart[0] + '*'.repeat(namePart.length - 2) + namePart[namePart.length - 1];
        return `${hiddenName}@${domainPart}`;
    }

    const hidePhone = (phone: string) => {
        if (phone.length < 4) return phone;
        return '*'.repeat(phone.length - 2) + phone.slice(-2);
    }

    const openModal = (id: string) => {
        (document.getElementById(id) as HTMLDialogElement)?.showModal();
    };

    React.useEffect(() => {
        setFullName(userProfile?.fullName ?? '');
        setEmail(userProfile?.email ?? '');
        setPhone(userProfile?.phone ?? '');
        setGender(userProfile?.gender ?? '');
        setAvatarUrl(userProfile?.avatar ?? '/default-avatar.jpg');
    }, [userProfile]);

    const updateProfile = async () => {
        const updatedProfiles = {
            fullName,
            email,
            phone,
            gender,
            walletAddress: userProfile?.walletAddress || undefined,
        };
        try {
            console.log("phone: ", updatedProfiles.phone)
            const response = await updateUserProfile(updatedProfiles, avatarFile);
            if (response && response.data) {
                setUserProfile(response.data);
            }
        } catch (error) {
            console.error('Failed to update profile:', error);
        }
    }
    const handleEmailChange = (newEmail: string) => {
        setEmail(newEmail);
        // updateProfile();
    }

    const handlePhoneChange = (newPhone: string) => {
        setPhone(newPhone);
        updateProfile();
    }
    console.log(phone);
    return (
        <>
            <div className="w-full">
                <div className="w-full bg-white p-8 rounded-2xl shadow-lg">
                    <h1 className="text-2xl font-bold mb-1">My Profile</h1>
                    <p className="text-gray-500 mb-8">Manage and protect your account</p>

                    <div className="grid grid-cols-3 gap-8">
                        <div className="col-span-2 space-y-6">

                        <div className="flex items-center">
                            <label className="w-32 text-gray-500 text-right pr-4" htmlFor="fullName">
                                Full Name
                            </label>
                            <DebounceInput 
                                type="text"
                                id="fullName"
                                name="fullName"
                                placeholder="Enter your full name"
                                value={fullName}
                                onChange={(value: string) => setFullName(value)}
                                className="flex-1 px-4 py-3 border border-darkgrey rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex items-center">
                            <label className="w-32 text-gray-500 text-right pr-4">
                                Email
                            </label>
                            <span>{hideEmail(email)}</span>
                            <button 
                                type="button"
                                onClick={() => openModal("email_modal")} 
                                className="link link-primary ml-4"
                            >
                                Change
                            </button>
                        </div>

                        <div className="flex items-center">
                            <label className="w-32 text-gray-500 text-right pr-4">
                                Phone number
                            </label>
                            <span>{hidePhone(phone)}</span>
                            <button
                                type="button"
                                onClick={() => openModal("phone_modal")} 
                                className="link link-primary ml-4"
                            >
                                Change
                            </button>
                        </div>

                        <div className="flex items-center">
                            <label className="w-32 text-gray-500 text-right pr-4">
                                Gender
                            </label>
                            <div className="flex space-x-4">
                                <label className="label cursor-pointer space-x-1">
                                    <input id="idx1" type="checkbox" name="category" checked={gender === 'male'} className="h-5 w-5 rounded border-[#232321] bg-transparent checked:bg-[#000000] checked:border-[#000000] checked:text-[#000000] appearance-none" onChange={() => setGender('male')}/>
                                    <span className="label-text">Male</span>
                                </label>
                                <label className="label cursor-pointer space-x-1">
                                    <input id="idx2" type="checkbox" name="category" checked={gender === 'female'} className="h-5 w-5 rounded border-[#232321] bg-transparent checked:bg-[#000000] checked:border-[#000000] checked:text-[#000000] appearance-none" onChange={() => setGender('female')}/>
                                    <span className="label-text">Female</span>
                                </label>
                                <label className="label cursor-pointer space-x-1">
                                    <input id="idx3" type="checkbox" name="category" checked={gender === 'other'} className="h-5 w-5 rounded border-[#232321] bg-transparent checked:bg-[#000000] checked:border-[#000000] checked:text-[#000000] appearance-none" onChange={() => setGender('other')}/>
                                    <span className="label-text">Other</span>
                                </label>
                            </div>
                        </div>

                        <div className="justify-self-center">
                            <div className="w-32"></div>
                            <button type="button" className="btn btn-neutral text-white" onClick={updateProfile}>
                                SAVE
                            </button>
                        </div>

                        </div>

                            <div className="col-span-1 flex flex-col items-center pt-8">
                            
                            <div className="mb-4">
                                <div className="rounded-full w-[100px] h-[100px] bg-gray-200 flex items-center justify-center">
                                    <Image src={avatarUrl} alt="avatar" width={64} height={64} className="w-[100px] h-[100px] rounded-full object-cover"/>
                                </div>
                            </div>

                            <label className="btn btn-outline btn-sm mb-4">
                                SELECT IMAGE
                                <input 
                                    type="file" 
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            const reader = new FileReader();
                                            reader.onloadend = () => {
                                                setAvatarUrl(reader.result as string);
                                                setAvatarFile(file);
                                            };
                                            reader.readAsDataURL(file);
                                        }
                                    }}
                                    className="hidden"
                                    accept=".jpeg,.jpg,.png" 
                                />
                            </label>

                            <div className="text-center text-sm text-gray-500">
                                <p>File size: maximum 1 MB</p>
                                <p>File extension: .JPEG, .PNG</p>
                            </div>
                            </div>
                        </div>
                        </div>
                </div>
                <EmailChangeModal modalId="email_modal" onEmailChange={handleEmailChange} />
                <PhoneChangeModal modalId="phone_modal" onPhoneChange={handlePhoneChange} />
        </>
    );
}