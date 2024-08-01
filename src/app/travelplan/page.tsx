'use client';
import PlaceCategory from '@/components/travel_plan/PlaceCategory';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
function TravelPlan() {
  const form = useForm();
  const [period, setPeriod] = useState(3);
  const [areaName, setAreaName] = useState('광명');
  const [rcPlace, setRcPlace] = useState(['']);
  //페이지 첫 렌더링 시 ai가 생성해준 데이터로 설정
  useEffect(() => {
    setPeriod(4), setAreaName('default'), setRcPlace(['해수욕장', '절', '샘플3']);
  }, []);

  return (
    <div className='border-solid border-2 flex h-screen'>
      <div className='border-solid border-2 flex max-h-full relative'>
        <div>
          <div className='flex flex-col items-center'>
            <div className='mb-5 mt-10 text-center'>{`${areaName}으로 가는 나만의 트레블리스트`}</div>
            <div className='mt-5 text-lg text-center'>{`${areaName}으로의 여행을 계획해볼까요?`}</div>
          </div>
          <Card className='rounded-lg border bg-cyan-500 text-card-foreground shadow-sm w-[250px] h-20 m-[20px]'>
            <Form {...form}>
              <div className='flex mt-4 justify-around'>
                <FormField
                  control={form.control}
                  name='username'
                  render={({ field }) => (
                    <FormItem>
                      <Select>
                        <FormControl>
                          <div>
                            <SelectTrigger className='pl-[35px] w-[100px]'>
                              <SelectValue placeholder={`${period}일`} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value='1' onClick={() => setPeriod(1)}>
                                1일
                              </SelectItem>
                              <SelectItem value='2' onClick={() => setPeriod(2)}>
                                2일
                              </SelectItem>
                              <SelectItem value='3' onClick={() => setPeriod(3)}>
                                3일
                              </SelectItem>
                              <SelectItem value='4' onClick={() => setPeriod(4)}>
                                4일
                              </SelectItem>
                              <SelectItem value='5' onClick={() => setPeriod(5)}>
                                5일
                              </SelectItem>
                            </SelectContent>
                          </div>
                        </FormControl>
                      </Select>
                    </FormItem>
                  )}
                />
                <div>
                  <Button type='submit' variant='blue' className='w-[100px]'>
                    생성하기
                  </Button>
                </div>
              </div>
            </Form>
          </Card>
          <div className='flex my-6 justify-around'>
            <PlaceCategory />
          </div>
          <div className='list_container flex flex-col border-solid border-2 box-content max-h-[480px] overflow-auto'>
            {rcPlace.map((item, idx) => (
              <div
                key={idx}
                className='list_component flex items-center border-solid border-2 w-full min-h-[100px]'
              >
                <div className='image_component border-solid border-2 rounded-md w-[64px] h-[64px] mx-[15px]'></div>
                <div>{item}</div>
              </div>
            ))}
          </div>
        </div>
        <div className='border-solid border-2 w-screen h-screen rounded-md border max-h-full overflow-auto relative'>
          <div className='flex rounded-md bg-gray-500/50 items-center m-[30px] -mb-[10px]'>
            <div className='rounded-md m-[5px] active:bg-white'>Travel Plan</div>
          </div>

          <div className='rounded-md bg-gray-500/50 w-[80%] h-[700px] overflow-auto m-[30px]'></div>
        </div>
      </div>
    </div>
  );
}

export default TravelPlan;
