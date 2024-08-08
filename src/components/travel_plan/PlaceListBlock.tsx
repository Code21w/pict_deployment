'use client';

import { RecommendedPlace } from '@/app/travelplan/page';
import ImageIcon from '@/assets/images/image_icon.png';
import Image from 'next/image';
import { LegacyRef } from 'react';
export interface PlaceListBlockProps {
  children?: React.ReactNode;
  variant?: string;
  Ref?: LegacyRef<HTMLDivElement>;
  item?: RecommendedPlace;
}
const PlaceListBlock = ({ children, variant, item }: PlaceListBlockProps) => {
  return (
    <div>
      <div
        className={`list_component flex items-center justify-between ${variant === 'small' ? 'w-[200px] h-[60px]' : 'w-[300px] h-[100px]'} `}
      >
        <div className='flex items-center'>
          <div
            className={`image_component rounded-md mx-[15px] ${variant === 'small' ? 'w-[44px] h-[44px]' : 'w-[64px] h-[64px]'} `}
          >
            <Image
              src={ImageIcon}
              alt='recommended_place'
              className={`object-scale-down ${variant === 'small' ? 'min-w-[44px] min-h-[44px]' : 'w-[64px] h-[64px]'}`}
            />
          </div>
          <div className={`${variant === 'small' ? 'text-sm' : ''} max-w-[120px]`}>
            {item?.title}
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default PlaceListBlock;
