'use client';

import { changePassword } from '@/apis/user';
import EyeRegular from '@/components/icons/eye';
import EyeOffRegular from '@/components/icons/eye-off';
import DebounceInput from '@/components/input/debounce-input';
import { useToast } from '@/context/toast-context';
import React, { useState, FormEvent } from 'react';
import { changePasswordSchema } from '../data';

export default function ChangePasswordScreen() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isShowCurrentPassword, setIsShowCurrentPassword] = useState(false);
  const [isShowNewPassword, setIsShowNewPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [errorCurrentPassword, setErrorCurrentPassword] = useState('');
  const [errorNewPassword, setErrorNewPassword] = useState('');
  const [errorConfirmPassword, setErrorConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async () => {
    setIsLoading(true);
    setErrorCurrentPassword('');
    setErrorNewPassword('');
    setErrorConfirmPassword('');

    const result = changePasswordSchema.safeParse({
      currentPassword,
      newPassword,
      confirmPassword,
    });

    if (!result.success) {
      result.error.issues.forEach((err) => {
        if (err.path.includes('currentPassword')) {
          setErrorCurrentPassword(err.message);
        }
        if (err.path.includes('newPassword')) {
          setErrorNewPassword(err.message);
        }
        if (err.path.includes('confirmPassword')) {
          setErrorConfirmPassword(err.message);
        }
        if (err.path.includes('passwordMismatch')) {
          setErrorConfirmPassword(err.message);
        }
        if (err.path.includes('currentPasswordMismatch')) {
          setErrorConfirmPassword(err.message);
        }
      });
      setIsLoading(false);
      return;
    }
    try {
      const response = await changePassword(currentPassword, newPassword);
      console.log(response);
      if (response) {
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setErrorConfirmPassword('Password changed successfully');
      } else {
        setErrorConfirmPassword('Failed to change password, please try again');
      }
    } catch (error) {
      setErrorConfirmPassword('Failed to change password, please try again');
      console.error('Error changing password:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <h1 className="text-2xl font-bold mb-1">Change Password</h1>
      <p className="text-graymain mb-8 border-b pb-4">
        Manage your password to protect your account
      </p>

      <div className='flex w-full justify-center'>
        <div className="space-y-6 max-w-2xl w-[42rem]">
                <div className="flex items-start">
                    <label className="w-64 text-gray-500 text-right pr-4" htmlFor="current-password">
                        Current Password
                    </label>
                    <div className='flex flex-col w-full'>
                      <div className='relative w-full'>
                        <DebounceInput 
                            type={isShowCurrentPassword ? "text" : "password"}
                            id="current-password"
                            name="current-password"
                            placeholder="Enter your current password"
                            value={currentPassword}
                            onChange={(value: string) => setCurrentPassword(value)}
                            className="w-full px-4 py-3 border border-darkgrey rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div
                          className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
                          onClick={() => setIsShowCurrentPassword(!isShowCurrentPassword)}
                        >
                          {isShowCurrentPassword ? <EyeRegular/> : <EyeOffRegular/>}
                        </div>
                      </div>
                      {errorCurrentPassword && (
                        <p className="text-[#FF0000] text-sm mt-1">{errorCurrentPassword}</p>
                      )}
                    </div>
                </div>

                <div className="flex items-start">
                    <label className="w-64 text-gray-500 text-right pr-4" htmlFor="new-password">
                      New Password
                    </label>
                    <div className='flex flex-col w-full'>
                      <div className='relative w-full'>
                        <DebounceInput 
                            type={isShowNewPassword ? "text" : "password"}
                            id="new-password"
                            name="new-password"
                            placeholder="Enter your new password"
                            value={newPassword}
                            onChange={(value: string) => setNewPassword(value)}
                            className="w-full px-4 py-3 border border-darkgrey rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div
                          className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
                          onClick={() => setIsShowNewPassword(!isShowNewPassword)}
                        >
                          {isShowNewPassword ? <EyeRegular/> : <EyeOffRegular/>}
                        </div>
                      </div>
                      {errorNewPassword && (
                        <p className="text-[#FF0000] text-sm mt-1">{errorNewPassword}</p>
                      )}
                    </div>
                </div>

                <div className="flex items-star">
                  <label className="w-64 text-gray-500 text-right pr-4" htmlFor="confirm-password">
                      Confirm New Password
                  </label>
                  <div className='flex flex-col w-full'>
                    <div className='relative w-full'>
                      <DebounceInput
                          type={isShowConfirmPassword ? "text" : "password"}
                          id="confirm-password"
                          name="confirm-password"
                          placeholder="Confirm your new password"
                          value={confirmPassword}
                          onChange={(value: string) => setConfirmPassword(value)}
                          className="w-full px-4 py-3 border border-darkgrey rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <div
                        className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
                        onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
                      >
                        {isShowConfirmPassword ? <EyeRegular/> : <EyeOffRegular/>}
                      </div>
                    </div>
                    {errorConfirmPassword && (
                      <p className="text-[#FF0000] text-sm">{errorConfirmPassword}</p>
                    )}
                  </div>
                </div>

                <div className="pt-2">
                    <button
                    type="submit"
                    className={`btn btn-neutral w-full ${isLoading ? 'btn-disabled' : ''}`}
                    disabled={isLoading}
                    onClick={() => {
                        handleSubmit();
                    }}
                    >
                    {isLoading ? (
                        <span className="loading loading-spinner"></span>
                    ) : (
                        'Save Changes'
                    )}
                    </button>
                </div>
        </div>
      </div>
    </div>
  );
}