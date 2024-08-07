'use client';
import React, { FormEvent, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/drop-down-menu"; // Adjust the import path as necessary
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import axios from 'axios';

function UserMenu () {
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isEditingUserName, setIsEditingUserName] = useState(false);
  const [userName, setUserName] = useState("John Doe");

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert('New password and confirmation do not match.');
      return;
    }

    try {
      const response = await axios.post('/api/change-password', {
        currentPassword,
        newPassword,
      });

      if (response.status === 200) {
        console.log('Password changed successfully.');
        setIsEditingPassword(false); 
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        console.error('Failed to change password.');
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  const handleMenuClick = (action: string) => {
    switch (action) {
      case "mypage":
        router.push("/my");
        break;
      case "myaccount":
        setModalOpen(true);
        break;
      case "logout":
        fetch("/api/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }).then(() => router.push("/"));
        break;
      default:
        break;
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setIsEditingPassword(false);
    setIsEditingUserName(false);
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent sideOffset={4}>
          <DropdownMenuItem onClick={() => handleMenuClick("mypage")}>
            My Page
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleMenuClick("myaccount")}>
            My Account
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleMenuClick("logout")}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={modalOpen} onOpenChange={handleModalClose}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle className={`font-['Cafe24Moyamoya-Face-v1.0'] text-center text-3xl`}>
              계정 관리
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col space-y-4">
            {/* Username Section */}
            <div>
              <span className="text-sm font-medium text-gray-700">닉네임</span>
              <div className="flex items-center">
                {isEditingUserName ? (
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="border p-2 rounded"
                  />
                ) : (
                  <span>{userName}</span>
                )}
                <Button
                  className="ml-auto"
                  onClick={() => setIsEditingUserName(!isEditingUserName)}
                >
                  {isEditingUserName ? "Save" : "Change"}
                </Button>
              </div>
            </div>

            {/* Password Section */}
            <div className="flex flex-col space-y-2 pt-2">
              <span className="text-sm font-medium text-gray-700">이메일</span>
              <span className="pt-1">yoolim0108@naver.com</span>
            </div>
  
            {/* Password Section */}
            <div className="pt-2">
              <span className="text-sm font-medium text-gray-700 ">비밀번호</span>
              {isEditingPassword ? (
                <form onSubmit={handleSubmit}>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                    className="border p-2 rounded mb-1"
                  />
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="border p-2 rounded mb-1"
                  />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    className="border p-2 rounded"
                  />
                  <div className="flex space-x-2 mt-4">
                    <Button type="submit" className="ml-auto">
                      Save
                    </Button>
                    <Button
                      type="button" // Ensure this is a button and not a submit button
                      className="ml-auto"
                      onClick={() => setIsEditingPassword(!isEditingPassword)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="flex items-center">
                  <span>********</span>
                  <Button
                    className="ml-auto"
                    onClick={() => setIsEditingPassword(!isEditingPassword)}
                  >
                    Change
                  </Button>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default UserMenu;

