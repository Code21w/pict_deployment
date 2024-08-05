/* eslint-disable react/jsx-props-no-spreading */

'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '../ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import axios from 'axios';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

const baseURL = `http://localhost:3000`;

const api = axios.create({ baseURL });
interface changePasswordType {
  password: string;
  passwordCheck: string;
}
interface TokenType {
  token: string;
}

const FormSchema = z.object({
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
}).refine((data) => data.password === data.passwordCheck, {
  message: "비밀번호가 일치하지 않습니다.",
  path: ["passwordCheck"], 
});

const ChangePassword: React.FC<TokenType> = ({ token }) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: 'onChange',
    defaultValues: {
      password: '',
      passwordCheck: '',
    },
  });

  async function onSubmit(data:changePasswordType ) {
    try {
      if (typeof token === 'string') { 
        const response = await api.post(`/api/reset-password/${token}`, { newPassword: data.password }, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });
        console.log(data);
        console.log(response.data);
        alert('비밀번호가 성공적으로 변경되었습니다. 다시 로그인 해 주세요.');
        router.push('/');
      } else {
        console.error('잘못된 토큰입니다. ');
        alert('권한이 없는 사용자 입니다.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('비밀번호 변경에 실패하였습니다.');
    }
  }

  return (
        <div className='password-reset-container'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>비밀번호</FormLabel>
                    <FormControl>
                      <Input type='password' placeholder='비밀번호를 입력하세요.' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='passwordCheck'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>비밀번호 확인</FormLabel>
                    <FormControl>
                      <Input type='password' placeholder='비밀번호를 재입력하세요.' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type='submit' className='w-full' disabled={!form.formState.isValid}>
                비밀번호 재설정
              </Button>
            </form>
          </Form>
        </div>
  );
}

export default ChangePassword;
