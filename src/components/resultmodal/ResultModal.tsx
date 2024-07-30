import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import React from 'react';

export function DialogDemo({
  responseImage,
  location,
  isUploadedImageVisible,
  setIsUploadedImageVisible,
  image,
  loading,
  similarity,
}) {
  const handleToggleImage = () => {
    setIsUploadedImageVisible(!isUploadedImageVisible);
  };
  return (
    <DialogContent className='sm:max-w-[1200px] h-[800px]'>
      <DialogHeader>
        <DialogTitle>
          <Button variant='link' onClick={handleToggleImage}>
            {isUploadedImageVisible ? '서버에서 받은 사진 보기' : '내가 넣은 사진 보기'}
          </Button>
        </DialogTitle>
      </DialogHeader>
      <div className='top-1 p-3 h-[350px] rounded-xl'>
        <div>
          {loading ? (
            <Skeleton className='h-4 w-full' />
          ) : isUploadedImageVisible ? (
            <img src={image} alt='Uploaded image' className='w-full h-full object-cover' />
          ) : responseImage ? (
            <img src={responseImage} alt='Response image' className='w-full h-full object-cover' />
          ) : (
            <Skeleton className='h-4 w-[250px]' />
          )}
        </div>
      </div>

      <div className='grid gap-1 grid place-items-center py-1'>
        <div className='flex flex-col space-y-3'>
          <DialogDescription className='h-10 text-black inline-flex items-center'>
            여기는{loading ? <Skeleton className='h-4 w-[50px]' /> : <>{location}</>} 같아요!
          </DialogDescription>
          <DialogDescription className='h-10 text-black inline-flex items-center'>
            유사도{loading ? <Skeleton className='h-4 w-[50px]' /> : <>{similarity}</>}{' '}
          </DialogDescription>
          <Skeleton className='h-4 w-[250px]' />
          <Skeleton className='h-4 w-[250px]' />
        </div>
      </div>
      <DialogFooter>
        <Button variant='link'>더 많은 정보 보러 가기</Button>
      </DialogFooter>
    </DialogContent>
  );
}
