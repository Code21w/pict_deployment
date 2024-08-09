'use client';

import { instance } from '@/api/instance';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
interface TokenType {
  token: string;
}

const VerifyEmail: React.FC<TokenType> = ({ token }) => {
  const router = useRouter();
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await instance.post(`/api/verify-email/${token}`);

        const isRegistrationSuccessful = response.data.message === 'User verified successfully';

        setIsValid(isRegistrationSuccessful);
        setIsModalOpen(true);

        if (isRegistrationSuccessful) {
          setTimeout(() => {
            router.push('/');
          }, 2000);
        }
      } catch (error) {
        console.error('Token verification failed:', error);
        setIsValid(false);
        setErrorMessage('인증에 실패했습니다. 다시 시도해 주세요.');
        setIsModalOpen(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      verifyToken();
    }
  }, [token, router]);

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle className={`font-['Cafe24Moyamoya-Face-v1.0'] text-center text-3xl`}>
            {isValid === null ? 'Loading...' : isValid ? 'Welcome!' : 'Invalid Token'}
          </DialogTitle>
        </DialogHeader>
        <div>
          {isValid ? (
            <p>
              회원가입이 완료되었습니다! <br /> 웹사이트의 여러가지 기능들을 즐겨 보세요.
            </p>
          ) : (
            <p>{errorMessage || '죄송합니다. 이 링크는 더 이상 유효하지 않습니다.'}</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VerifyEmail;
