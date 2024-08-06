import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';
import Link from 'next/link';

export function DialogDemo({
  responseImage,
  location,
  locationInfo,
  isUploadedImageVisible,
  setIsUploadedImageVisible,
  image,
  loading,
  similarity,
}) {
  const handleToggleImage = () => {
    setIsUploadedImageVisible(!isUploadedImageVisible);
  };

  const truncateText = (text, limit) => {
    if (text.length > limit) {
      return text.substring(0, limit) + '...';
    }
    return text;
  };

  const charLimit = 700;
  return (
    <DialogContent className='sm:max-w-[1200px] h-[800px]'>
      <DialogHeader>
        <DialogTitle>
          <Button
            variant='link'
            onClick={handleToggleImage}
            className='text-gray-500'
            style={{ marginBottom: '1px' }}
          >
            {isUploadedImageVisible ? '서버에서 받은 사진 보기' : '내가 넣은 사진 보기'}
          </Button>
        </DialogTitle>
      </DialogHeader>
      <div
        className='w-full h-[400px] flex items-center justify-center'
        style={{ marginTop: '1px' }}
      >
        <div className='flex items-center justify-center w-full h-full'>
          {loading ? (
            <Skeleton className='w-full h-full' />
          ) : isUploadedImageVisible ? (
            <img
              src={image}
              alt='Uploaded image'
              className='max-w-full max-h-full object-contain'
            />
          ) : responseImage ? (
            <img
              src={responseImage}
              alt='Response image'
              className='max-w-full max-h-full object-contain'
            />
          ) : (
            <Skeleton className='w-full h-full' />
          )}
        </div>
      </div>

      <div className='grid gap-1 place-items-center'>
        <div className='flex flex-col text-center'>
          <DialogDescription
            className='h-20 text-4xl text-black inline-flex items-center justify-center font-["Cafe24Moyamoya-Face-v1.0"]'
            style={{ marginBottom: '1px' }}
          >
            비슷한 장소로 {loading ? <Skeleton className='h-10 w-[50px] px-2' /> : <>{location}</>}{' '}
            어때요?
          </DialogDescription>
          <DialogDescription className='h-10 text-black inline-flex items-center justify-center'>
            유사도 {loading ? <Skeleton className='h-4 w-[25px]' /> : <>{similarity}</>} %
          </DialogDescription>
          <DialogDescription
            className='text-black inline-flex items-center justify-center p-2'
            style={{
              height: 'auto',
              maxHeight: '400px',
              wordWrap: 'break-word',
              wordBreak: 'break-all',
            }}
          >
            {loading ? (
              <Skeleton className='h-4 w-[450px]' />
            ) : (
              <pre style={{ whiteSpace: 'pre-wrap', margin: 0 }}>
                {truncateText(JSON.stringify(locationInfo, null, 2), charLimit)}
              </pre>
            )}
          </DialogDescription>
        </div>
      </div>
      <DialogFooter>
        <Link href='/subpage'>
          <Button variant='link'>더 많은 정보 보러 가기</Button>
        </Link>
      </DialogFooter>
    </DialogContent>
  );
}
