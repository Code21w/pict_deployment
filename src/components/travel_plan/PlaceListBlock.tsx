'use client';

import ImageIcon from '@/assets/images/image_icon.png';
import Image from 'next/image';
import { LegacyRef } from 'react';
export interface PlaceListBlockProps {
  children?: React.ReactNode;
  variant?: string;
  Ref?: LegacyRef<HTMLDivElement>;
  item?: string;
}
const PlaceListBlock = ({ children, variant, item }: PlaceListBlockProps) => {
  return (
    <div>
      <div
        className={`list_component flex items-center justify-between ${variant === 'small' ? 'w-[200px] h-[64px]' : 'w-[300px] h-[100px]'} `}
      >
        <div className='flex items-center'>
          <div
            className={`image_component rounded-md mx-[15px] ${variant === 'small' ? 'w-[48px] h-[48px]' : 'w-[64px] h-[64px]'} `}
          >
            <Image
              src={ImageIcon}
              alt='recommended_place'
              className={`object-scale-down ${variant === 'small' ? 'w-[48px] h-[48px]' : 'w-[64px] h-[64px]'}`}
            />
          </div>
          <div>{item}</div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default PlaceListBlock;
