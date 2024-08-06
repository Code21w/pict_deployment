'use client';

import { Button, ButtonProps } from '@/components/ui/button.tsx';
import { cn } from '@/lib/utils.ts';
import { HTMLAttributes, ReactNode, useEffect, useState } from 'react';
export interface TravelPlanCheckButtonProps {
  // changeSelectCount: Function;
  changeTempPlaceList: Function;
  item: string;
}

const TravelPlanCheckButton = ({
  // changeSelectCount,
  changeTempPlaceList,
  item,
}: TravelPlanCheckButtonProps) => {
  const [isChecked, setIsChecked] = useState(false);
  useEffect(() => {
    setIsChecked(isChecked);
  }, [isChecked]);
  const getButtonStyles = (): { value: ReactNode } & Pick<HTMLAttributes<'button'>, 'className'> &
    Pick<ButtonProps, 'variant'> => {
    return !isChecked
      ? {
          value: '+',
          variant: 'outline',
          className: 'bg-accent text-2xl text-gray-500/50',
        }
      : {
          value: <>&#10003;</>,
          variant: 'check',
          className: 'text-xl text-white',
        };
  };

  const { value, className, variant, ...rest } = getButtonStyles();
  function toggleActive() {
    setIsChecked((prev) => !prev);
  }
  const handleClick = () => {
    // changeSelectCount(isChecked);
    toggleActive();
    changeTempPlaceList(item, isChecked);
  };
  return (
    <Button
      className={cn('w-1 h-10 px-4 py-2 font-bold', className)}
      onClick={handleClick}
      variant={variant}
      {...rest}
    >
      {value}
    </Button>
  );
};
export default TravelPlanCheckButton;
