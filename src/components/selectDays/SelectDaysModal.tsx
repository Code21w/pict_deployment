// src/components/selectDays/SelectDaysModal.tsx
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

export const SelectDaysModal: React.FC<SelectDaysModalProps> = ({ initialDays, onSave }) => {
  const [travelDays, setTravelDays] = useState(initialDays);
  const [location, setLocation] = useState('');

  useEffect(() => {
    const uploadFileResponseString = sessionStorage.getItem('uploadFileResponse');
    if (uploadFileResponseString) {
      const uploadFileResponse = JSON.parse(uploadFileResponseString);

      if (
        uploadFileResponse.result &&
        uploadFileResponse.result[0] &&
        uploadFileResponse.result[0].location
      ) {
        const fullLocation = uploadFileResponse.result[0].location;

        // 전체 위치 문자열을 공백으로 나누고 마지막 요소(도시명)를 가져옴
        const locationParts = fullLocation.split(' ');
        const cityName = locationParts[locationParts.length - 1];

        setLocation(cityName);

        // 도시명만 세션에 저장
        sessionStorage.setItem('location', cityName);

        // 다음 페이지에서 location 값 이렇게 가져가세요
        // const cityName = sessionStorage.getItem('location');
      } else {
        console.error('Location data is missing in the uploadFileResponse.');
      }
    } else {
      console.error('uploadFileResponse is not available in sessionStorage.');
    }
  }, []);

  return (
    <Card className='w-[460px] h-[400px] py-8'>
      <CardHeader className='p-6 text-center'>
        <CardTitle className='text-lg pb-4 text-gray-600'>
          {location}으로 가는 나만의 트래블 리스트
          {location}으로 가는 나만의 트래블 리스트
        </CardTitle>
        <CardDescription>
          <span className='text-4xl font-bold pr-2'>{location}</span>
          <span className='text-4xl font-bold pr-2'>{location}</span>
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
