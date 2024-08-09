'use client';
import { instance } from '@/api/instance';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/drop-down-menu';

function UserMenu() {
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [Password, setPasswordError] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isEditingUserName, setIsEditingUserName] = useState(false);
  const [originalUserName, setOriginalUserName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [local, setLocal] = useState('local');
  const [verified, setVerified] = useState(false);
  const userNameLimit = 20;
  const [emailSent, setEmailSent] = useState(false);

  function deleteCookie(name: string) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await instance.get('/api/user', {
          withCredentials: true,
        });
        const userData = response.data;

        setOriginalUserName(userData.display_name);
        setVerified(userData.verified_email);
        setLocal(userData.platform_type);
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
      setError('닉네임을 입력해야 합니다.');
      return;
    }

    try {
      const response = await instance.put(
        '/api/user/display-name',
        { newDisplayName: userName },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setIsEditingUserName(false);
        setError('');
      }
    } catch (err) {
      setError('닉네임 업데이트 실패. 다시 시도해주세요.');
      console.error('Error updating username:', err);
    }
  };

  const handleDeleteUser = async () => {
    const userConfirmed = confirm('정말 탈퇴하시겠습니까?');

    if (userConfirmed) {
      try {
        const response = await instance.delete('/api/user', { withCredentials: true });

        if (response.status === 200) {
          alert('성공적으로 탈퇴하였습니다.');
          deleteCookie('connect.sid');
          location.reload();
        }
      } catch (err) {
        console.error('Error deleting user:', err);
      }
    } else {
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.preventDefault();

    if (newPassword.length < 8) {
      setPasswordError('새 비밀번호는 최소 8자 이상이어야 합니다.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('비밀번호가 일치하지 않습니다.');
      return;
    }

    setPasswordError('');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setIsEditingPassword(false);

    if (newPassword !== confirmPassword) {
      alert('New password and confirmation do not match.');
      return;
    }

    try {
      const response = await instance.put(
        '/api/user/password',
        {
          currentPassword,
          newPassword,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
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

  const handleMenuClick = async (action: string) => {
    switch (action) {
      case 'mypage':
        router.push('/my');
        break;
      case 'myaccount':
        setModalOpen(true);
        break;
      case 'logout':
        try {
          await instance.post('/api/logout', {}, { withCredentials: true });
          deleteCookie('connect.sid');

          location.reload();
        } catch (error) {
          console.error('Error during logout:', error);
        }
        break;
      default:
        break;
    }
  };

  const onEmailSubmitCheck = async () => {
    if (!email || isButtonDisabled) return;
    setIsButtonDisabled(true);
    try {
      await instance.post('/api/verify-email', {
        email,
      });

      setEmailSent(true);
    } catch (error) {
      console.error('Email resend failed:', error);
      setIsButtonDisabled(false); // Re-enable the button to allow retry if there was an error
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
          <Button>메뉴</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent sideOffset={4}>
          <DropdownMenuItem onClick={() => handleMenuClick('mypage')}>마이 페이지</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleMenuClick('myaccount')}>내 계정</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleMenuClick('logout')}>로그아웃</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {verified === true ? (
        <Dialog open={modalOpen} onOpenChange={handleModalClose}>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle className={`font-['Cafe24Moyamoya-Face-v1.0'] text-center text-3xl`}>
                계정 관리
              </DialogTitle>
            </DialogHeader>
            <div className='flex flex-col space-y-4'>
              {/* Username Section */}
              <div>
                <span className='text-sm font-medium text-gray-700'>닉네임</span>
                <div className='flex items-center'>
                  {isEditingUserName ? (
                    <>
                      <input
                        type='text'
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        maxLength={userNameLimit}
                        className='border p-2 rounded'
                        placeholder='닉네임 입력'
                      />
                      <Button
                        className='ml-2'
                        onClick={handleUserNameChange} // Save username
                      >
                        저장
                      </Button>
                      <Button
                        className='ml-2'
                        onClick={() => {
                          setUserName(originalUserName); // 취소 시 원래 값으로 복구
                          setIsEditingUserName(false);
                        }}
                      >
                        취소
                      </Button>
                    </>
                  ) : (
                    <>
                      <span>{userName}</span>
                      <Button
                        className='ml-auto'
                        onClick={() => {
                          setUserName(userName);
                          setIsEditingUserName(true);
                        }}
                      >
                        수정
                      </Button>
                    </>
                  )}
                </div>
                {error && <span className='text-red-500 text-sm'>{error}</span>}{' '}
                {/* Display error messages */}
                {isEditingUserName && (
                  <span className='text-sm text-gray-500'>
                    {userName.length}/{userNameLimit} 글자 수
                  </span>
                )}
              </div>

              {/* Email Section */}
              <div className='flex flex-col space-y-2 pt-2'>
                <span className='text-sm font-medium text-gray-700'>이메일</span>
                <span className='pt-1'>{email}</span>
              </div>

              {/* Password Section */}
              {local === 'local' && (
                <div className='pt-2'>
                  <span className='text-sm font-medium text-gray-700'>비밀번호</span>
                  {isEditingPassword ? (
                    <form onSubmit={handleSubmit}>
                      <input
                        type='password'
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder='현재 비밀번호를 입력하세요'
                        className='border p-2 rounded mb-1'
                      />
                      <input
                        type='password'
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder='변경할 비밀번호를 입력하세요'
                        className='border p-2 rounded mb-1'
                      />
                      <input
                        type='password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder='변경할 비밀번호를 확인하세요'
                        className='border p-2 rounded'
                      />
                      {error && <p className='text-red-500'>{Password}</p>}
                      <div className='flex space-x-2 mt-4'>
                        <Button type='submit' className='ml-auto'>
                          저장
                        </Button>
                        <Button
                          type='button'
                          className='ml-auto'
                          onClick={() => setIsEditingPassword(false)}
                        >
                          취소
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <div className='flex items-center'>
                      <span>********</span>
                      <Button className='ml-auto' onClick={() => setIsEditingPassword(true)}>
                        수정
                      </Button>
                    </div>
                  )}
                </div>
              )}
              <div></div>
              <Button className='mt-4' onClick={handleDeleteUser}>
                탈퇴하기
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      ) : (
        <Dialog open={modalOpen} onOpenChange={handleModalClose}>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle className='font-["Cafe24Moyamoya-Face-v1.0"] text-center text-3xl'>
                이메일 인증
              </DialogTitle>
            </DialogHeader>
            <p style={{ fontSize: '15px' }}>
              거의 다 왔습니다!
              <br />
              {email}으로 이메일 인증링크를 전송하려면,아래를 클릭해 주세요.:
            </p>
            {!emailSent ? (
              <Button
              type='button'
              className='w-full'
              onClick={onEmailSubmitCheck}
              disabled={!email || isButtonDisabled}
            >
              이메일 다시 보내기
            </Button>
            ) : (
              <p style={{ fontSize: '12px', fontWeight: 'bold' }}>
                이메일이 보내졌습니다. 메일함을 확인해 주세요.
              </p>
            )}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export default UserMenu;
