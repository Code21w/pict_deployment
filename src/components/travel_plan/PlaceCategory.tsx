'use client';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils.ts';
import { useState } from 'react';
const CATEGORY = [
  {
    key: 'attractions',
    label: '인문명소',
  },
  {
    key: 'nature',
    label: '자연명소',
  },
  {
    key: 'activity',
    label: '액티비티',
  },
  {
    key: 'culture',
    label: '문화시설',
  },
];
// export interface PlaceCategoryProps {
//   storeCategory: Function;
// }
function PlaceCategory(props: {
  changeCategory: (categoryKey: string) => void;
  checkTempPlaceWithCategory: () => void;
}) {
  const [currentCategory, setCurrentCategory] = useState('');

  const onClickBadge = (categoryKey: string) => {
    setCurrentCategory(categoryKey);
    props.changeCategory(categoryKey);
    props.checkTempPlaceWithCategory();
  };
  return CATEGORY.map((category) => {
    const { key, label } = category;
    const isActive = currentCategory === key;
    return (
      <Badge
        key={key}
        variant='outline'
        className={cn('hover:cursor-pointer', isActive && 'bg-cyan-400 text-white')}
        onClick={() => onClickBadge(key)}
      >
        {label}
      </Badge>
    );
  });
}

export default PlaceCategory;
