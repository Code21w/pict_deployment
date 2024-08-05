'use client';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils.ts';
import { useState } from 'react';
const categoryList = [
  {
    key: 'location',
    label: '인문장소',
  },
  {
    key: 'nature',
    label: '자연',
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
function PlaceCategory() {
  const [currentCategory, setCurrentCategory] = useState(categoryList[0].key);

  const onClickBadge = (categoryKey: string) => {
    setCurrentCategory(categoryKey);
  };

  return categoryList.map((category) => {
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
