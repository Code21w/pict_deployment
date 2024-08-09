'use client';

import { instance } from '@/api/instance';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
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
  const [isFirstDialogOpen, setIsFirstDialogOpen] = useState(false);
  const [isSecondDialogOpen, setIsSecondDialogOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    mode: 'onChange',
    defaultValues: {
      display_name: '',
      email: '',
      password: '',
      passwordCheck: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      await instance.post('/api/register', {
        email: data.email,
        password: data.password,
        display_name: data.display_name,
        verified_email: false,
      });
      setEmail(data.email);

      setErrorMessage(null);
      setIsFirstDialogOpen(false); // 첫 번째 다이얼로그 닫기
      setIsSecondDialogOpen(true); // 두 번째 다이얼로그 열기
    } catch (error) {
      console.error('Register failed:', error);
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(error.response.data.message || '등록에 실패했습니다.');
      } else {
        setErrorMessage('등록에 실패했습니다.');
      }
    }
  };

  const onEmailSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      await instance.post('/api/verify-email', {
        email: data.email,
      });
    } catch (error) {
      console.error('Email resend failed:', error);
    }
  };

  const onEmailSubmitCheck = async () => {
  if (!email || isButtonDisabled) return;
  setIsButtonDisabled(true);
  try {
    const response = await instance.post('/api/verify-email', {
      email,
    });
    console.log('Verification email sent:', response.data);
    setEmailSent(true);
  } catch (error) {
    console.error('Email resend failed:', error);
    setIsButtonDisabled(false); // Re-enable the button to allow retry if there was an error
  }
};


  return (
    <>
      <Dialog open={isFirstDialogOpen} onOpenChange={setIsFirstDialogOpen}>
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
            {errorMessage && <div className='error-message text-red-600'>{errorMessage}</div>}
            <Form {...form}>
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
            <DialogTitle className='font-["Cafe24Moyamoya-Face-v1.0"] text-center text-3xl'>
              이메일 인증
            </DialogTitle>
          </DialogHeader>
          <p style={{ fontSize: '15px' }}>
            거의 다 왔습니다!
            <br />
            {email}으로 인증 메일을 전송하시려면, 아래 버튼을 클릭해주세요.
            <br />
            <br />
            인증 이메일 보내기:
          </p>
          {!emailSent ? (
            <Button
            type='button'
            className='w-full'
            onClick={onEmailSubmitCheck}
            disabled={!email || isButtonDisabled}
          >
            이메일 보내기
          </Button>
          ) : (
            <p style={{ fontSize: '12px', fontWeight: 'bold' }}>
              이메일이 보내졌습니다. 메일함을 확인해 주세요.
            </p>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Join;
