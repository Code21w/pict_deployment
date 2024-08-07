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
      className={`fixed z-10 ${isExpanded ? 'buttonSlideOut right-[525px]' : 'buttonSlideIn right-[705px]'} bottom-[450px] hover:cursor-pointer`}
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
