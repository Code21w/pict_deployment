'use client';

import React, { useState } from 'react'; // useState 추가
import Image from 'next/image';

import CloudAnimation from '@/components/Cloud';
import imageicon from '@/assets/images/image_icon.png';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
// import { toast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import Link from 'next/link';

import { Button } from '@/components/ui/button';

// import { Join } from '@/components/Join';

import Globe from '@/components/Globe';

function Main() {
  return (
    <main className={`flex min-h-screen items-center justify-between`}>
      <div className='w-full h-full'>
        <div className='mx-[100px] lg:mx-[250px] mb-[100px] lg:-mb-[150px] flex flex-col justify-between'>
          <div
            className={`relative text-8xl lg:text-[144px] xl:text-[192px] font-['Cafe24Moyamoya-Face-v1.0'] -py-3`}
          >
            여기서
          </div>
          <div
            className={`self-end relative text-8xl lg:text-[144px] xl:text-[192px] font-['Cafe24Moyamoya-Face-v1.0'] -my-3`}
          >
            세계속으로
          </div>
        </div>
        <div className='relative z-1 -mt-[100px] ml-[50px]'>
          <Globe />
        </div>
        <div className='relative z-2 -mt-[650px]'>
          <CloudAnimation />
        </div>
        <div className='relative z-3 -mt-[450px] mb-[150px] ml-[50%] flex flex-col w-[500px] h-[100px] '>
          <div className='flex'>
            <div className='text-lg'>해외 이미지를 넣으면&nbsp;</div>
            <b className='text-lg'>국내에서 가장 비슷한 곳</b>
            <div className='text-lg'>을 찾아드려요!</div>
          </div>
          <div className=' flex items-center bg-gray-100 rounded-3xl shadow-md justify-center mt-[10px]'>
            <Image src={imageicon} alt='UploadImageIcon.png' />
            <input
              className='w-[300px] h-[100px] bg-gray-100 pl-[10px]'
              placeholder='Drag an image here or upload a file'
            ></input>
          </div>
          <div>
            <button className='w-[500px] h-[50px] bg-cyan-300 active:bg-cyan-400 rounded-3xl shadow-md mt-[10px]'>
              여기랑 비슷한 곳 찾아주세요!
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Main;
