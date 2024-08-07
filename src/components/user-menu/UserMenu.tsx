'use client';
import React, { useContext, useState, useEffect, FormEvent } from 'react';
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
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/user',{
          withCredentials: true, 
        }); 
        const userData = response.data;
        setUserName(userData.display_name); 
        setEmail(userData.email); 
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleUserNameChange = async () => {
    if (userName.trim() === '') {
      setError('닉네임을 입력해야 합니다.'); // Message in case of empty input
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/mypage/display-name', {
        userName, withCredentials: true, 
      });

      if (response.status === 200) {
        setIsEditingUserName(false); // Exit editing mode
        setError(''); // Clear any previous errors
        console.log('Username updated successfully:', response.data);
      }
    } catch (err) {
      setError('닉네임 업데이트 실패. 다시 시도해주세요.'); // Generic error message
      console.error('Error updating username:', err);
    }
  };

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
            <>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="border p-2 rounded"
                placeholder="닉네임 입력"
              />
              <Button
                className="ml-2"
                onClick={handleUserNameChange} // Save username
              >
                Save
              </Button>
              <Button
                className="ml-2"
                onClick={() => setIsEditingUserName(false)} // Cancel editing
              >
                Cancel
              </Button>
            </>
          ) : (
            <>
              <span>{userName}</span>
              <Button
                className="ml-auto"
                onClick={() => setIsEditingUserName(true)} // Start editing
              >
                Change
              </Button>
            </>
          )}
        </div>
        {error && <span className="text-red-500 text-sm">{error}</span>} {/* Display error messages */}
            </div>

            {/* Email Section */}
            <div className="flex flex-col space-y-2 pt-2">
              <span className="text-sm font-medium text-gray-700">이메일</span>
              <span className="pt-1">{email}</span>
            </div>
  
            {/* Password Section */}
            <div className="pt-2">
              <span className="text-sm font-medium text-gray-700">비밀번호</span>
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



