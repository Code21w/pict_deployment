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
import { useForm } from 'react-hook-form';
function TravelPlan() {
  const form = useForm();
  const day = 3; //기간 선택한거에 따라 변동
  return (
    <div className='border-solid border-2 flex h-screen'>
      <div className='border-solid border-2 flex max-h-full relative'>
        <div>
          <div className='flex flex-col items-center'>
            <div className='m-5 mt-10'>광명으로 가는 나만의 트레블리스트</div>
            <div className='mt-5 text-lg'>광명으로의 여행을 계획해볼까요?</div>
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
                              <SelectValue placeholder='날짜' />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value='1'>1일</SelectItem>
                              <SelectItem value='2'>2일</SelectItem>
                              <SelectItem value='3'>3일</SelectItem>
                              <SelectItem value='4'>4일</SelectItem>
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
            백에서 받아올 장소 정보
            <div className='list_component flex items-center border-solid border-2 w-full min-h-[100px]'>
              <div className='image_component border-solid border-2 rounded-md w-[64px] h-[64px] mx-[15px]'></div>
              <div>장소이름</div>
            </div>
            <div className='list_component flex items-center border-solid border-2 w-full min-h-[100px]'>
              <div className='image_component border-solid border-2 rounded-md w-[64px] h-[64px] mx-[15px]'></div>
              <div>장소이름</div>
            </div>
            <div className='list_component flex items-center border-solid border-2 w-full min-h-[100px]'>
              <div className='image_component border-solid border-2 rounded-md w-[64px] h-[64px] mx-[15px]'></div>
              <div>장소이름</div>
            </div>
            <div className='list_component flex items-center border-solid border-2 w-full min-h-[100px]'>
              <div className='image_component border-solid border-2 rounded-md w-[64px] h-[64px] mx-[15px]'></div>
              <div>장소이름</div>
            </div>
            <div className='list_component flex items-center border-solid border-2 w-full min-h-[100px]'>
              <div className='image_component border-solid border-2 rounded-md w-[64px] h-[64px] mx-[15px]'></div>
              <div>장소이름</div>
            </div>
            <div className='list_component flex items-center border-solid border-2 w-full min-h-[100px]'>
              <div className='image_component border-solid border-2 rounded-md w-[64px] h-[64px] mx-[15px]'></div>
              <div>장소이름</div>
            </div>
            <div className='list_component flex items-center border-solid border-2 w-full min-h-[100px]'>
              <div className='image_component border-solid border-2 rounded-md w-[64px] h-[64px] mx-[15px]'></div>
              <div>장소이름</div>
            </div>
            <div className='list_component flex items-center border-solid border-2 w-full min-h-[100px]'>
              <div className='image_component border-solid border-2 rounded-md w-[64px] h-[64px] mx-[15px]'></div>
              <div>장소이름</div>
            </div>
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
