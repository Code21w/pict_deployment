// components/PlanCheck/PlanEditHeader.tsx

'use client';
import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

type buttonType = '취소' | '적용' | '저장';

const PlanEditHeader: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<buttonType>('취소'); // eslint-disable-line no-unused-vars

  const days: buttonType[] = ['취소', '적용', '저장']; // eslint-disable-line no-unused-vars

  const handleDayClick = (day: buttonType) => {
    // eslint-disable-line no-unused-vars
    setSelectedDay(day);
    // switch(day) {
    //     case '전체일정':
    //         navigate('/schedule');
    //         break;
    //         case 'Day 1':
    //         navigate('/schedule/day1');
    //         break;
    //         case 'Day 2':
    //         navigate('/schedule/day2');
    //         break;
    //         case 'Day 3':
    //         navigate('/schedule/day3');
    //         break;
    // }
  };

  return (
    <div className='fixed left-0 top-0 bottom-0 w-[120px] bg-white border-r-2 border-gray-300 flex flex-col justify-between items-center p-4'>
      <div className='flex flex-col items-center'>
        <img src='PicT01.png' className='w-20 h-20 rounded-full object-cover mb-8' alt='Logo' />

        <div className='w-full flex flex-col items-center space-y-4'>
          {/* {days.map((day) => (
                <button
                key={day}
                onClick={() => handleDayClick(day)}
                className={`w-full py-3 rounded-lg text-lg font-bold transition-all duration-200 ease-in-out
                    ${selectedDay === day
                    ? 'bg-blue-500 text-white transform scale-105'
                    : 'bg-white border border-gray-300 text-black hover:bg-blue-500 hover:text-white'
                    } active:transform active:scale-105`}
                >
                {day}
                </button>
            ))} */}
        </div>
      </div>

      <div className='w-full flex flex-col items-center space-y-4 mb-8'>
        <button className='w-full py-3 bg-white border-2 border-blue-500 rounded-lg text-black text-lg font-bold hover:bg-blue-100 transition-all duration-200 ease-in-out active:transform active:scale-105'>
          취소
        </button>
        <button className='w-full py-3 bg-white border-2 border-blue-500 rounded-lg text-black text-lg font-bold hover:bg-blue-100 transition-all duration-200 ease-in-out active:transform active:scale-105'>
          적용
        </button>
        <button className='w-full py-6 bg-black rounded-lg text-white text-lg font-bold hover:bg-gray-800 transition-all duration-200 ease-in-out active:transform active:scale-105'>
          저장
        </button>
      </div>
    </div>
  );
};

export default PlanEditHeader;
