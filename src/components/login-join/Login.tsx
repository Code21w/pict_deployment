'use client';

import React, { ReactNode, useContext } from 'react';
import Image from 'next/image';
// import {
//   Dialog,
//   DialogContent,
//   // DialogDescription,
//   // DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '../ui/dialog';
// import { Input } from '../ui/input';
// // import { Label } from './ui/label';
// import {
//   Form,
//   FormControl,
//   // FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '../ui/form';
// // import { toast } from '@/components/ui/use-toast';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { SubmitHandler, useForm } from 'react-hook-form';
// import { z } from 'zod';
// interface ButtonProp { // 여기 한 줄 수정
// 	children: string | ReactNode;
// 	_onClick?: (e: React.FormEvent<HTMLFormElement>) => void;
// }
// // import Link from 'next/link';

// import { Button } from '@/components/ui/button';
// import Link from 'next/link';

// const FormSchema = z.object({
//   email: z.string().email({
//     message: '올바른 이메일 형식이 아닙니다.',
//   }),
//   password: z.string().min(1, {
//     message: '비밀번호가 입력되지 않았습니다.',
//   }),
// });

// function Login() {
//   const form = useForm<z.infer<typeof FormSchema>>({
//     resolver: zodResolver(FormSchema),
//     mode: 'onChange',
//     defaultValues: {
//       email: '',
//       password: '',
//     },
//   });

//   function onSubmit(data: z.infer<typeof FormSchema>) {
//     fetch('http://localhost:5000/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data),
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then((data) => {
//         console.log('Success:', data);
//         // 성공적인 로그인 후의 로직 추가
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//         // 에러 처리 로직 추가
//       });
//   }

//   return (
//       <Dialog>
//         <DialogTrigger asChild>
//           <button className='text-foreground transition-colors hover:text-muted'>로그인</button>
//         </DialogTrigger>
//         <DialogContent className='sm:max-w-[425px]'>
//           <DialogHeader>
//             <DialogTitle className={`font-['Cafe24Moyamoya-Face-v1.0'] text-center text-3xl`}>
//               로그인
//             </DialogTitle>
//             {/* <DialogDescription>
//               Make changes to your profile here. Click save when you're done.
//             </DialogDescription> */}
//           </DialogHeader>
//           {/* <div className='grid gap-4 py-4'>
//             <div className='grid grid-cols-4 items-center gap-4'>
//               <Label htmlFor='name' className='text-right'>
//                 Name
//               </Label>
//               <Input id='name' defaultValue='Pedro Duarte' className='col-span-3' />
//             </div>
//             <div className='grid grid-cols-4 items-center gap-4'>
//               <Label htmlFor='username' className='text-right'>
//                 Email
//               </Label>
//               <Input type='password' id='username' defaultValue='@peduarte' className='col-span-3' />
//             </div>
//           </div> */}
//           <div className='space-y-7'>
//             <Form {...form}>
//               <form onSubmit={form.handleSubmit(onSubmit)}>
//                 <div className='space-y-6'>
//                   <FormField
//                     control={form.control}
//                     name='email'
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>이메일</FormLabel>
//                         <FormControl>
//                           <Input placeholder='이메일을 입력하세요.' {...field} />
//                         </FormControl>
//                         {/* <FormDescription>This is your public display name.</FormDescription> */}
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name='password'
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>비밀번호</FormLabel>
//                         <FormControl>
//                           <Input type='password' placeholder='비밀번호를 입력하세요.' {...field} />
//                         </FormControl>
//                         {/* <FormDescription>This is your public display name.</FormDescription> */}
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <Button type='submit' className='w-full' disabled={!form.formState.isValid}>
//                     로그인
//                   </Button>
//                 </div>
//               </form>
//             </Form>
//             <div className='hr-sect'>또는</div>
//             <div className='space-y-2'>
//               <Button type='submit' className='w-full bg-gray-200 hover:bg-gray-300 text-black'>
//                 <Image src='google.svg' alt='google' width={23} height={23} className='mr-2' />
//                 구글로 시작하기
//               </Button>
//               <Button type='submit' className='w-full bg-yellow-400 hover:bg-yellow-500 text-black'>
//                 <Image src='kakao.svg' alt='kakao' width={23} height={23} className='mr-2' />
//                 카카오로 시작하기
//               </Button>
//             </div>
//           </div>
//           <Link className="link" href={`/auth/change-password`}>
//             비밀번호를 까먹으셨나요?
//           </Link>
//           {/* <DialogFooter> */}
//           {/* <button type='submit'>Save changes</button> */}
//           {/* </DialogFooter> */}
//         </DialogContent>
//       </Dialog>
//   );
// }

// export default Login;
import { useState } from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '../ui/form';
import { Input } from '../ui/input'; // Adjust the import according to your setup
import { UserContext } from './UserContext'; 

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
  const [isFirstDialogOpen, setIsFirstDialogOpen] = useState(false);
  const [isSecondDialogOpen, setIsSecondDialogOpen] = useState(false);
  const [isThirdDialogOpen, setIsThirdDialogOpen] = useState(false);
  const [email, setEmail] = useState('');
  const { setUser } = useContext(UserContext);

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
      const response = await axios.post('http://localhost:3000/api/login', data);
      console.log('Login successful:', response.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const message = error.response.data.message;
        if (message === '비밀번호가 일치하지 않습니다.') {
          form.setError('password', { type: 'manual', message });
        } else if (message === '이메일이 존재하지 않습니다.') {
          form.setError('email', { type: 'manual', message });
        }
      }
    }
  };

  const onEmailSubmit = async (data: { email: React.SetStateAction<string>; }) => {
    try {
      setEmail(data.email);
      const response = await axios.post('http://localhost:3000/api/reset-password', data);
      // Handle successful response
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
      <Button onClick={() => setIsFirstDialogOpen(true)}>로그인</Button>

      <Dialog open={isFirstDialogOpen} onOpenChange={setIsFirstDialogOpen}>
        <DialogTrigger asChild>
          <button className='text-foreground transition-colors hover:text-muted'>로그인</button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle className='font-["Cafe24Moyamoya-Face-v1.0"] text-center text-3xl'>로그인</DialogTitle>
          </DialogHeader>
          <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
      <FormField
        control={form.control}
        name='email'
        render={({ field }) => (
          <FormItem>
            <FormLabel>이메일</FormLabel>
            <FormControl>
              <Input
                placeholder='이메일을 입력하세요.'
                {...field} // Use field instead of form.register
              />
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
            <Button className='w-full bg-gray-200 hover:bg-gray-300 text-black'>
              <Image src='/google.svg' alt='google' width={23} height={23} className='mr-2' />
              구글로 시작하기
            </Button>
            <Button className='w-full bg-yellow-400 hover:bg-yellow-500 text-black'>
              <Image src='/kakao.svg' alt='kakao' width={23} height={23} className='mr-2' />
              카카오로 시작하기
            </Button>
          </div>
          <Link href='#' onClick={() => { setIsFirstDialogOpen(false); setIsSecondDialogOpen(true); }}  className="link">
            비밀번호를 잊으셨나요?
          </Link>
        </DialogContent>
      </Dialog>

      <Dialog open={isSecondDialogOpen} onOpenChange={setIsSecondDialogOpen}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle className='font-["Cafe24Moyamoya-Face-v1.0"] text-center text-3xl'>비밀번호 재설정</DialogTitle>
          </DialogHeader>
          <p style={{ fontSize: '12px' }}>걱정하지 마세요! 가입할 때 사용한 이메일을 입력해 주시면, 비밀번호를 재설정할 수 있게 도와드릴게요.</p>
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
              <Button type='submit' className='w-full' disabled={!emailForm.formState.isValid} onClick={() => { setIsSecondDialogOpen(false); setIsThirdDialogOpen(true); }}>
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
              <DialogTitle className='font-["Cafe24Moyamoya-Face-v1.0"] text-center text-3xl'>비밀번호 재설정</DialogTitle>
            </DialogHeader>
            <p style={{ fontSize: '12px' }}>{email} 계정이 존재한다면, 비밀번호 재설정 링크를 이메일로 보내드렸습니다. 받은 편지함을 확인하시고, 링크를 통해 비밀번호를 새롭게 설정하세요.</p>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

export default Login;
