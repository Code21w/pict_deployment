'use client';

import { Button } from '@/components/ui/button.tsx';
import { useState } from 'react';

const TravelPlanCheckButton = (prop: { changeSelectCountFunction: Function }) => {
  const [isChecked, setIsChecked] = useState(false);
  //   const [placeSelectCount, setPlaceSelectCount] = useState(0);
  const getButtonStyles = () => {
    return !isChecked
      ? {
          value: 'off',
        }
      : {
          value: 'on',
        };
  };

  const { ...rest } = getButtonStyles();
  // className, variant,
  function toggleActive() {
    setIsChecked((prev) => !prev);
  }
  return !isChecked ? (
    <Button
      className='w-1 h-10 px-4 py-2 text-2xl text-gray-500/50 font-bold'
      onClick={
        () => {
          prop.changeSelectCountFunction(isChecked), toggleActive();
        }
        //순서를 바꾸면 toggleActive()가 먼저 실행되어 작동을 안함.
      }
      variant='outline'
      {...rest}
    >
      +
    </Button>
  ) : (
    <Button
      className='w-1 h-10 px-4 py-2 text-xl text-white font-bold'
      onClick={() => {
        prop.changeSelectCountFunction(isChecked), toggleActive();
      }}
      variant='check'
      {...rest}
    >
      &#10003;
    </Button>
  );
};

export default TravelPlanCheckButton;
