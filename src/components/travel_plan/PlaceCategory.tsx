import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
const categoryList = ['인문장소', '자연', '액티비티', '문화시설'];
function PlaceCategory() {
  const [btnActive, setBtnActive] = useState(1);

  function handleSubmit(num: number) {
    setBtnActive(num);
  }
  return categoryList.map((item, idx) => (
    <Badge
      key={idx}
      variant='outline'
      className={`${btnActive === idx ? 'bg-yellow-500' : ''}`}
      onClick={() => handleSubmit(idx)}
    >
      {item}
    </Badge>
  ));
}
export default PlaceCategory;
