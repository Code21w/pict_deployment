'use client';
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
import PropTypes from 'prop-types';

interface DialogDemoProps {
  responseImage: string | null;
  location: string | null;
  locationInfo: string;
  isUploadedImageVisible: boolean;
  setIsUploadedImageVisible: (visible: boolean) => void;
  image: string | null;
  loading: boolean;
  similarity: number;
}

export function DialogDemo({
  responseImage,
  location,
  locationInfo,
  isUploadedImageVisible,
  setIsUploadedImageVisible,
  image,
  loading,
  similarity,
}: DialogDemoProps) {
  const handleToggleImage = () => {
    setIsUploadedImageVisible(!isUploadedImageVisible);
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength - 4) + '...';
    }
    return text;
  };

  const truncatedLocationInfo =
    locationInfo.length > 554 ? truncateText(locationInfo, 550) : locationInfo;

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
        className='w-full h-[430px] flex items-center justify-center'
        style={{ marginTop: '1px', position: 'relative', top: '-25px' }}
      >
        <div className='flex items-center justify-center w-full h-full'>
          {(() => {
            if (loading) {
              return <Skeleton className='w-full h-full' />;
            } else if (isUploadedImageVisible) {
              return (
                <img
                  src={image || undefined}
                  alt='Uploaded image'
                  className='max-w-full max-h-full object-contain'
                />
              );
            } else if (responseImage) {
              return (
                <img
                  src={responseImage || undefined}
                  alt='Response image'
                  className='max-w-full max-h-full object-contain'
                />
              );
            } else {
              return <Skeleton className='w-full h-full' />;
            }
          })()}
        </div>
      </div>

      <div className='relative grid gap-1 place-items-center' style={{ top: '-40px' }}>
        <div className='flex flex-col text-center'>
          <DialogDescription
            className='h-20 text-4xl text-black inline-flex items-center justify-center font-["Cafe24Moyamoya-Face-v1.0"]'
            style={{ marginBottom: '1px', position: 'relative' }}
          >
            비슷한 장소로 {loading ? <Skeleton className='h-10 w-[50px] px-2' /> : <>{location}</>}{' '}
            어때요?
          </DialogDescription>
          <DialogDescription
            className='text-xl h-10 text-black inline-flex items-center justify-center'
            style={{ marginBottom: '1px', position: 'relative', top: '-15px' }}
          >
            유사도 {loading ? <Skeleton className='h-4 w-[25px]' /> : <>{similarity}</>} %
          </DialogDescription>
          <DialogDescription
            className='text-base text-black inline-flex items-center justify-center p-2'
            style={{
              position: 'relative',
              top: '-15px',
              height: 'auto',
              maxHeight: '400px',
              wordWrap: 'break-word',
              wordBreak: 'break-all',
            }}
          >
            {loading ? (
              <>
                <div style={{ height: '138px', width: '1100px' }}>
                  <Skeleton style={{ height: '100%', width: '100%' }} />
                </div>
              </>
            ) : (
              <>{truncatedLocationInfo}</>
            )}
          </DialogDescription>
        </div>
      </div>
      <DialogFooter className='absolute bottom-5 right-5'>
        <Link href='/subpage'>
          <Button variant='link'>더 많은 정보 보러가기</Button>
        </Link>
      </DialogFooter>
    </DialogContent>
  );
}

DialogDemo.propTypes = {
  locationInfo: PropTypes.string.isRequired,
};
