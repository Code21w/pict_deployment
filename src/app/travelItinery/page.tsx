// app/travelItinery/page.tsx
'use client';

import SplitPane from 'react-split-pane-next';
import React from 'react';
import Map from '@/components/shared/kakaoMap';
import TravelHeader from '@/components/shared/TravelHeader';

const travelItinerary: React.FC = () => {
  return (
    <div className='h-screen flex'>
      <SplitPane split='vertical' minSize={85} maxSize={400}>
        <div className='flex h-full'>
          <div className='w-[85px] bg-yellow-500 flex flex-col border-r border-gray-300'>
            <div className='p-4'>
              <TravelHeader />
            </div>
          </div>
          <div className='flex-1 bg-cyan-500 flex flex-col p-4'>
            <h2 className='text-xl font-bold mb-4'>장소</h2>
          </div>
        </div>
        <div className='bg-white h-full'>
          <Map />
        </div>
      </SplitPane>
    </div>
  );
};

export default travelItinerary;
