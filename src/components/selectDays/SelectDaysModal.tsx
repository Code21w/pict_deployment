// src/components/selectDays/selectDaysModal.tsx
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useEffect, useState } from 'react';

interface SelectDaysModalProps {
  initialDays: string;
  onClose: () => void;
  onSave: (days: string) => void;
}

export const SelectDaysModal: React.FC<SelectDaysModalProps> = ({
  initialDays,
  onClose,
  onSave,
}) => {
  const [travelDays, setTravelDays] = useState(initialDays);
  const [cityName, setCityName] = useState(''); // 도시 이름 상태 추가

  useEffect(() => {
    const locationInfoResponseString = sessionStorage.getItem('locationInfoResponse');
    if (locationInfoResponseString) {
      const locationInfoResponse = JSON.parse(locationInfoResponseString);
      const cityName = locationInfoResponse.response[0].location.split(' ')[1];
      setCityName(cityName);
    }
  }, []);

  return (
    <Card className='w-[460px] h-[400px] py-8'>
      <CardHeader className='p-6 text-center'>
        <CardTitle className='text-lg pb-4 text-gray-600'>
          {cityName}으로 가는 나만의 트래블 리스트
        </CardTitle>
        <CardDescription>
          <span className='text-4xl font-bold pr-2'>{cityName}</span>
          <span className='text-2xl mt-2'>으로의 여행을 계획해볼까요?</span>
        </CardDescription>
      </CardHeader>
      <CardContent className='p-8 space-y-4 flex justify-center items-center'>
        <div className='grid place-items-start'>
          <div className='grid gap-2'>
            <label htmlFor='travelDays' className='text-gray-600 font-medium'>
              여행 일정을 선택해 주세요.
            </label>
            <Select value={travelDays} onValueChange={setTravelDays}>
              <SelectTrigger id='travelDays'>
                <SelectValue placeholder='Select' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='1'>1일</SelectItem>
                <SelectItem value='2'>2일</SelectItem>
                <SelectItem value='3'>3일</SelectItem>
                <SelectItem value='4'>4일</SelectItem>
                <SelectItem value='5'>5일</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
      <CardFooter className='p-6 pt-10 justify-end'>
        <Button
          onClick={() => onSave(travelDays)}
          className='bg-blue-500 hover:bg-blue-600 text-white px-8 py-2 rounded-md'
        >
          다음
        </Button>
      </CardFooter>
    </Card>
  );
};
