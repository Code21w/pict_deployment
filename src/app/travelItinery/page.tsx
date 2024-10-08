// app/travelItinery/page.tsx
'use client';

import TravelHeader from '@/components/shared/TravelHeader';
import Map from '@/components/shared/kakaoMapItinerary';
import Dashboard from '@/components/travelItinerary/dnd/Dashboard';
import React from 'react';
import SplitPane from 'react-split-pane-next';

const travelItinerary: React.FC = () => {
  // const currentCart = useCartStore((state) => state.currentCart);

  // useEffect(() => {
  //   console.log('Current Cart:', currentCart);
  // }, [currentCart]);

  return (
    <div className='h-screen flex'>
      <SplitPane split='vertical' minSize={85} maxSize={400}>
        <div className='flex h-full'>
          <div className='w-[85px] bg-white flex flex-col border-r border-gray-300'>
            <div className='p-4'>
              <TravelHeader />
            </div>
          </div>
          <div className='flex-1 bg-white flex flex-col p-4'>
            <h2 className='text-xl font-bold mb-4'>장소</h2>
            <Dashboard />
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
