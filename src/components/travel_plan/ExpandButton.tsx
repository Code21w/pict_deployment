'use client';

import { Button } from '@/components/ui/button.tsx';

export interface ExpandButtonProps {
  isExpanded: boolean;
  toggleExpand: () => void;
}

function ExpandButton({ isExpanded, toggleExpand }: ExpandButtonProps) {
  const getButtonStyles = () => {
    return !isExpanded
      ? {
          value: 'off',
          content: '>',
        }
      : {
          value: 'on',
          content: '<',
        };
  };

  const { value, content, ...rest } = getButtonStyles();

  return (
    <Button
      className={`flex w-[5px] right-0 absolute z-10 bottom-[50%] hover:cursor-pointer`}
      // ${isExpanded ? 'buttonSlideOut' : 'buttonSlideIn'}
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
