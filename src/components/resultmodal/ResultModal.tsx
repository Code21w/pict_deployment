'use client';

import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogDescription,
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
  totalResults: number; // Number of total results
  activeResultIndex: number; // Current index of the result being displayed
  onNavigate: (index: number) => void; // Function to handle navigation
}

export function DialogDemo({
  responseImage,
  location,
  locationInfo,
  isUploadedImageVisible,
  setIsUploadedImageVisible,
  image,
  similarity,
  totalResults,
  activeResultIndex,
  onNavigate,
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

  const getImageSrc = () => {
    if (isUploadedImageVisible) {
      return image || '';
    }
    if (responseImage) {
      return responseImage || '';
    }
    return null;
  };

  const imageSrc = getImageSrc();

  return (
    <DialogContent className='sm:max-w-[1100px] h-[800px]'>
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

      <div className='w-full h-[430px] flex flex-col items-center justify-center'>
        <div className='flex items-center justify-center w-full h-full'>
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={isUploadedImageVisible ? 'Uploaded image' : 'Response image'}
              className='max-w-full max-h-full object-contain rounded-lg shadow-md'
            />
          ) : (
            <Skeleton className='w-full h-full' />
          )}
        </div>

        <div className='mt-2 text-center'>{truncatedLocationInfo}</div>
      </div>

      <div className='relative grid gap-1 place-items-center pt-6' style={{ top: '-40px' }}>
        <div className='flex flex-col text-center'>
          <DialogDescription className='h-20 text-4xl text-black inline-flex items-center justify-center font-["Cafe24Moyamoya-Face-v1.0"]'>
            <span>비슷한 장소로 {location} 어때요?</span>
          </DialogDescription>
          <DialogDescription className='text-xl h-10 text-black inline-flex items-center justify-center'>
            유사도 {similarity.toFixed(2)} %
          </DialogDescription>
        </div>
      </div>

      <div className='flex flex-col justify-center items-center'>
        <Link href={`/subpage?index=${activeResultIndex}`}>
          <Button
            variant='blue'
            className='flex items-center justify-center py-2 px-4 text-white rounded-lg'
          >
            <span className='mr-2'>🗺️</span> {/* Map emoji */}더 많은 정보 보러가기
          </Button>
        </Link>

        <div className='flex justify-between w-full px-5 relative z-20 mt-1'>
          <Button
            variant='outline'
            className='text-black border-black hover:bg-black hover:text-white'
            disabled={activeResultIndex === 0}
            onClick={() => onNavigate(activeResultIndex - 1)}
          >
            이전
          </Button>
          <Button
            variant='outline'
            className='text-black border-black hover:bg-black hover:text-white'
            disabled={activeResultIndex >= totalResults - 1}
            onClick={() => onNavigate(activeResultIndex + 1)}
          >
            다음
          </Button>
        </div>
      </div>
    </DialogContent>
  );
}

DialogDemo.propTypes = {
  responseImage: PropTypes.string,
  location: PropTypes.string,
  locationInfo: PropTypes.string.isRequired,
  isUploadedImageVisible: PropTypes.bool.isRequired,
  setIsUploadedImageVisible: PropTypes.func.isRequired,
  image: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  similarity: PropTypes.number.isRequired,
  totalResults: PropTypes.number.isRequired, // New prop for total results
  activeResultIndex: PropTypes.number.isRequired, // New prop for the current index
  onNavigate: PropTypes.func.isRequired, // New prop for navigation function
};
