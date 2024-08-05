'use client';

import { Button } from '@/components/ui/button.tsx';
export interface ExpandButtonProps {
  isExpanded: boolean;
  toggleExpand: () => void;
}
function ExpandButton({ isExpanded, toggleExpand }: ExpandButtonProps) {
  if (typeof document !== 'undefined') {
    const temp = document.getElementById('temp_place_edit_container');
    const getButtonStyles = () => {
      return !isExpanded
        ? (temp
            ? (temp.className =
                'slideIn relative border-solid border-2 border-green-500 font-bold w-[120px]')
            : '',
          {
            value: 'off',
            content: '>',
          })
        : (temp
            ? (temp.className =
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
          // toggleActive
          toggleExpand();
        }}
        {...rest}
      >
        {content}
      </Button>
    );
  }
}
// }

export default ExpandButton;
