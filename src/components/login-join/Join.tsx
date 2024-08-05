'use client';

import React, { useState, useRef, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  // DialogDescription,
  // DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Input } from '../ui/input';
// import { Label } from './ui/label';
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';

// import Link from 'next/link';

import { Button } from '../ui/button';
import axios from 'axios';

const FormSchema = z
  .object({
    display_name: z.string().min(2, {
      message: '이름은 두 글자 이상이어야 합니다.',
    }),
    email: z.string().email({
      message: '올바른 이메일 형식이 아닙니다.',
    }),
    password: z
      .string()
      .min(1, {
        message: '비밀번호가 입력되지 않았습니다.',
      })
      .min(8, {
        message: '비밀번호는 여덟 글자 이상이어야 합니다.',
      }),
    passwordCheck: z
      .string()
      .min(1, {
        message: '비밀번호가 입력되지 않았습니다.',
      })
      .min(8, {
        message: '비밀번호는 여덟 글자 이상이어야 합니다.',
      }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    path: ['passwordCheck'],
    message: '비밀번호가 일치하지 않습니다.',
  });

function Join() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isFirstDialogOpen, setIsFirstDialogOpen] = useState(false);
  const [isSecondDialogOpen, setIsSecondDialogOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false); 
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(FormSchema),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: 'onChange',
    defaultValues: {
      display_name: '',
      email: '',
      password: '',
      passwordCheck: '',
    },
  });


  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const response = await axios.post('http://localhost:3000/api/register', { 
        email: data.email, 
        password: data.password, 
        display_name: data.display_name,
        verified_email: false 
      });
      setEmail(data.email);
      console.log('Register successful:', response.data);
      setIsRegistered(true);
      setErrorMessage(null); 

      await onEmailSubmit(data); 
    } catch (error) {
      console.error('Register failed:', error);
      
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(error.response.data.message || '등록에 실패했습니다.');
      } else {
        setErrorMessage('등록에 실패했습니다.'); 
      }
    }
  }

  const onEmailSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const response = await axios.post('http://localhost:3000/api/verify-email', { 
        email: data.email,
      });
      console.log('Verification email sent:', response.data);
    } catch (error) {
      console.error('Email resend failed:', error);
    }
  };

  const onEmailSubmitCheck = async () => {
    if (!email) return; 
    try {
      const response = await axios.post('http://localhost:3000/api/verify-email', { 
        email, 
      });
      console.log('Verification email sent:', response.data);
      setEmailSent(true); 
    } catch (error) {
      console.error('Email resend failed:', error);
    }
  };

  return (
    <><Dialog open={isFirstDialogOpen} onOpenChange={setIsFirstDialogOpen}>
      <DialogTrigger asChild>
        <button type='button' className='text-foreground transition-colors hover:text-muted'>
          회원가입
        </button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle className={`font-['Cafe24Moyamoya-Face-v1.0'] text-center text-3xl`}>
            회원가입
          </DialogTitle>
        </DialogHeader>
        <div>
          {/* {isRegistered ? (
            <div className='text-center'>
              <p>회원가입이 성공적으로 완료되었습니다.</p>
            </div>
          ) : ( */}
            <Form {...form}>
               {errorMessage && <div className="error-message text-red-600">{errorMessage}</div>}
              <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                <FormField
                  control={form.control}
                  name='display_name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>이름</FormLabel>
                      <FormControl>
                        <Input placeholder='이름을 입력하세요.' {...field} />
                      </FormControl>
                      {/* <FormDescription>이름은 두 글자 이상이어야 합니다.</FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )} />
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>이메일</FormLabel>
                      <FormControl>
                        <Input placeholder='이메일을 입력하세요.' {...field} />
                      </FormControl>
                      {/* <FormDescription>This is your public display name.</FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )} />
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>비밀번호</FormLabel>
                      <FormControl>
                        <Input type='password' placeholder='비밀번호를 입력하세요.' {...field} />
                      </FormControl>
                      {/* <FormDescription>비밀</FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )} />
                <FormField
                  control={form.control}
                  name='passwordCheck'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>비밀번호 확인</FormLabel>
                      <FormControl>
                        <Input type='password' placeholder='비밀번호를 재입력하세요.' {...field} />
                      </FormControl>
                      {/* <FormDescription>This is your public display name.</FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )} />
                <Button type='submit' className='w-full' disabled={!form.formState.isValid} onClick={() => { setIsFirstDialogOpen(false); setIsSecondDialogOpen(true); }}>
                  회원가입
                </Button>
              </form>
            </Form>
        </div>
      </DialogContent>
    </Dialog>
    <Dialog open={isSecondDialogOpen} onOpenChange={setIsSecondDialogOpen}>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle className='font-["Cafe24Moyamoya-Face-v1.0"] text-center text-3xl'>이메일 인증</DialogTitle>
            </DialogHeader>
            <p style={{ fontSize: '15px' }}>거의 다 왔습니다!<br /> {email}으로 이메일 확인 링크를 전송했습니다. 이메일을 확인하고 “내 이메일 주소 확인”을 클릭하세요. <br /><br />이메일을 받지 못하셨나요? 아래를 클릭하여 다시 보내주세요:</p>
            {!emailSent ? (
        <Button
          type='button' 
          className='w-full'
          onClick={onEmailSubmitCheck} 
          disabled={!email} 
        >
          이메일 다시 보내기
        </Button>
      ) : (
        <p style={{ fontSize: '12px' , fontWeight: 'bold' }}>이메일이 보내졌습니다. 메일함을 확인해 주세요.</p>
      )}
          </DialogContent>
    </Dialog></>
  );
}

export default Join;

