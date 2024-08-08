// src/components/selectDays/travelDaysSelector.tsx
'use client';

import { SelectDaysModal } from '@/components/selectDays/SelectDaysModal';
import { useState } from 'react';
export interface travelDaysSelectorProps {
  selectDay: Function;
}
export function TravelDaysSelector({ selectDay }: travelDaysSelectorProps) {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [travelDays, setTravelDays] = useState('3');

  if (!isModalOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <SelectDaysModal
        initialDays={travelDays}
        onClose={() => setIsModalOpen(false)}
        onSave={(days) => {
          selectDay(days);
          setTravelDays(days);
          sessionStorage.setItem('travelDays', days);
          setIsModalOpen(false);
        }}
      />
    </div>
  );
}

// 컴포넌트 사용법
// 페이지에 임포트 할 때 이렇게 하시면 됩니다.

// import { TravelDaysSelector } from '@/components/selectDays/TravelDaysSelector';

// export default function TravelPlanPage() {
//     return (
//         <div>
//         <h1>Travel Plan Page</h1>
//         {/* 페이지의 다른 내용들 */}
//         <TravelDaysSelector />
//         </div>
//     );
// }
