'use client';

import React from 'react';
import Image from 'next/image';
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
// import { toast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// import Link from 'next/link';

import { Button } from '@/components/ui/button';

const FormSchema = z.object({
  email: z.string().email({
    message: '올바른 이메일 형식이 아닙니다.',
  }),
  password: z.string().min(1, {
    message: '비밀번호가 입력되지 않았습니다.',
  }),
});

function Login() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Success:', data);
        // 성공적인 로그인 후의 로직 추가
      })
      .catch((error) => {
        console.error('Error:', error);
        // 에러 처리 로직 추가
      });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className='text-foreground transition-colors hover:text-muted'>로그인</button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle className={`font-['Cafe24Moyamoya-Face-v1.0'] text-center text-3xl`}>
            로그인
          </DialogTitle>
          {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
        </DialogHeader>
        {/* <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='name' className='text-right'>
              Name
            </Label>
            <Input id='name' defaultValue='Pedro Duarte' className='col-span-3' />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='username' className='text-right'>
              Email
            </Label>
            <Input type='password' id='username' defaultValue='@peduarte' className='col-span-3' />
          </div>
        </div> */}
        <div className='space-y-7'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className='space-y-6'>
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
                  )}
                />
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>비밀번호</FormLabel>
                      <FormControl>
                        <Input type='password' placeholder='비밀번호를 입력하세요.' {...field} />
                      </FormControl>
                      {/* <FormDescription>This is your public display name.</FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type='submit' className='w-full' disabled={!form.formState.isValid}>
                  로그인
                </Button>
              </div>
            </form>
          </Form>
          <div className='hr-sect'>또는</div>
          <div className='space-y-2'>
            <Button type='submit' className='w-full bg-gray-200 hover:bg-gray-300 text-black'>
              <Image src='google.svg' alt='google' width={23} className='mr-2' />
              구글로 시작하기
            </Button>
            <Button type='submit' className='w-full bg-yellow-400 hover:bg-yellow-500 text-black'>
              <Image src='kakao.svg' alt='kakao' width={23} className='mr-2' />
              카카오로 시작하기
            </Button>
          </div>
        </div>
        {/* <DialogFooter> */}
        {/* <button type='submit'>Save changes</button> */}
        {/* </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}

export default Login;
