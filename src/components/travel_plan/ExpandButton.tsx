'use client';

import { Button } from '@/components/ui/button.tsx';
import { RefObject } from 'react';
export interface ExpandButtonProps {
  isExpanded: boolean;
  toggleExpand: () => void;
  componentRef: RefObject<HTMLDivElement>;
}
function ExpandButton({ componentRef, isExpanded, toggleExpand }: ExpandButtonProps) {
  const slideDiv = componentRef.current;
  const getButtonStyles = () => {
    return !isExpanded
      ? (slideDiv
          ? (slideDiv.className =
              'slideIn relative border-solid border-2 border-green-500 font-bold w-[120px]')
          : '',
        {
          value: 'off',
          content: '>',
        })
      : (slideDiv
          ? (slideDiv.className =
              'slideOut relative border-solid border-2 border-green-500 font-bold w-[300px]')
          : '',
        {
          value: 'on',
          content: '<',
        });
  };

  const { value, content, ...rest } = getButtonStyles();

  return (
    <Button
      className='absolute z-10 -right-11 top-[450px] hover:cursor-pointer'
      onClick={() => {
        toggleExpand();
      }}
      {...rest}
    >
      {content}
    </Button>
  );
  // }
}
// }

export default ExpandButton;
