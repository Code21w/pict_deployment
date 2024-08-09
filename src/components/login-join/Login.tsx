'use client';

import { baseURL, instance } from '@/api/instance';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input'; // Adjust the import according to your setup
import { useLoginModalStore } from '@/store/store.ts';

const FormSchema = z.object({
  email: z.string().email({
    message: '올바른 이메일 형식이 아닙니다.',
  }),
  password: z.string().min(1, {
    message: '비밀번호가 입력되지 않았습니다.',
  }),
});

const EmailSchema = z.object({
  email: z.string().email({ message: '올바른 이메일 형식이 아닙니다.' }),
});

function Login() {
  const { isOpenLoginModal, setIsOpenLoginModal } = useLoginModalStore();
  const [isSecondDialogOpen, setIsSecondDialogOpen] = useState(false);
  const [isThirdDialogOpen, setIsThirdDialogOpen] = useState(false);
  const [email, setEmail] = useState('');

  const router = useRouter();
  type FormData = z.infer<typeof FormSchema>;
  type EmailData = z.infer<typeof EmailSchema>;

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const emailForm = useForm<EmailData>({
    resolver: zodResolver(EmailSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const response = await instance.post('/api/login', data, {
        withCredentials: true,
      });

      setIsOpenLoginModal(false);

      location.reload();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const message = error.response.data.message;

        form.setError('root', { type: 'manual', message: '비밀번호 또는 이메일이 틀렸습니다.' });
      }
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${baseURL}/api/login/federated/google`;
  };

  const handleKakaoLogin = () => {
    window.location.href = '${ baseURL }/api/login/federated/kakao';
  };

  const onEmailSubmit = async (data: { email: React.SetStateAction<string> }) => {
    try {
      setEmail(data.email);
      const response = await instance.post('/api/reset-password', data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const message = error.response.data.message;
        if (message === '이메일이 존재하지 않습니다.') {
          emailForm.setError('email', { type: 'manual', message });
        }
      }
    }
  };

  return (
    <>
      <Dialog open={isOpenLoginModal} onOpenChange={setIsOpenLoginModal}>
        <DialogTrigger asChild>
          <button className='text-foreground transition-colors hover:text-muted'>로그인</button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle className='font-["Cafe24Moyamoya-Face-v1.0"] text-center text-3xl'>
              로그인
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              {form.formState.errors.root && (
                <div className='text-red-500'>{form.formState.errors.root.message}</div>
              )}

              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이메일</FormLabel>
                    <FormControl>
                      <Input placeholder='이메일을 입력하세요.' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>비밀번호</FormLabel>
                    <FormControl>
                      <Input
                        type='password'
                        placeholder='비밀번호를 입력하세요.'
                        {...field} // Use field instead of form.register
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type='submit' className='w-full' disabled={!form.formState.isValid}>
                로그인
              </Button>
            </form>
          </Form>
          <div className='hr-sect'>또는</div>
          <div className='space-y-2'>
            <Button
              type='submit'
              className='w-full bg-gray-200 hover:bg-gray-300 text-black'
              onClick={handleGoogleLogin}
            >
              <Image src='google.svg' alt='google' width={23} height={23} className='mr-2' />
              구글로 시작하기
            </Button>
            <Button
              type='submit'
              className='w-full bg-yellow-400 hover:bg-yellow-500 text-black'
              onClick={handleKakaoLogin}
            >
              <Image src='kakao.svg' alt='kakao' width={23} height={23} className='mr-2' />
              카카오로 시작하기
            </Button>
          </div>
          <Link
            href='#'
            onClick={() => {
              setIsOpenLoginModal(false);
              setIsSecondDialogOpen(true);
            }}
            className='link'
          >
            비밀번호를 잊으셨나요?
          </Link>
        </DialogContent>
      </Dialog>

      <Dialog open={isSecondDialogOpen} onOpenChange={setIsSecondDialogOpen}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle className='font-["Cafe24Moyamoya-Face-v1.0"] text-center text-3xl'>
              비밀번호 재설정
            </DialogTitle>
          </DialogHeader>
          <p style={{ fontSize: '12px' }}>
            걱정하지 마세요! 가입할 때 사용한 이메일을 입력해 주시면, 비밀번호를 재설정할 수 있게
            도와드릴게요.
          </p>
          <Form {...emailForm}>
            <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className='space-y-8'>
              <FormField
                control={emailForm.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이메일</FormLabel>
                    <FormControl>
                      <Input placeholder='이메일을 입력하세요.' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type='submit'
                className='w-full'
                disabled={!emailForm.formState.isValid}
                onClick={() => {
                  setIsSecondDialogOpen(false);
                  setIsThirdDialogOpen(true);
                }}
              >
                계속하기
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {isThirdDialogOpen && (
        <Dialog open={isThirdDialogOpen} onOpenChange={setIsThirdDialogOpen}>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle className='font-["Cafe24Moyamoya-Face-v1.0"] text-center text-3xl'>
                비밀번호 재설정
              </DialogTitle>
            </DialogHeader>
            <p style={{ fontSize: '12px' }}>
              {email} 계정이 존재한다면, 비밀번호 재설정 링크를 이메일로 보내드렸습니다. 받은
              편지함을 확인하시고, 링크를 통해 비밀번호를 새롭게 설정하세요.
            </p>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

export default Login;
