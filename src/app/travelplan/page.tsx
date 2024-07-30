'use client';
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

const cityName = ['서울', '부산', '대구', '인천', '광주', '대전', '울산', '세종', '경기', '강원'];
function Travelplan() {
  const form = useForm();
  return (
    <div className='border-solid border-2 flex h-screen'>
      <div className='border-solid border-2 flex max-h-full relative'>
        <Card className='rounded-lg border bg-cyan-500 text-card-foreground shadow-sm w-[350px] h-56 m-[30px]'>
          <Form {...form}>
            <div className='flex mt-6 justify-around'>
              <FormField
                control={form.control}
                name='지역'
                render={({ field }) => (
                  <FormItem>
                    <Select>
                      <FormControl>
                        <div>
                          <SelectTrigger className='pl-[40px] w-[120px]'>
                            <SelectValue placeholder='지역' />
                          </SelectTrigger>
                          <SelectContent>
                            {cityName.map((item, idx) => (
                              <SelectItem value={item}>{item}</SelectItem>
                            ))}
                          </SelectContent>
                        </div>
                      </FormControl>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <FormItem>
                    <Select>
                      <FormControl>
                        <div>
                          <SelectTrigger className='pl-[40px] w-[120px]'>
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
            </div>
            <div className='flex mt-6 justify-around'>
              <Button variant='outline'>추천장소</Button>
              <Button variant='outline'>명소</Button>
              <Button variant='outline'>식당</Button>
              <Button variant='outline'>카페</Button>
            </div>
            <div className='flex mt-6 justify-center'>
              <Button type='submit'>생성하기</Button>
            </div>
          </Form>
        </Card>
        <div className='border-solid border-2 w-screen h-screen rounded-md border max-h-full overflow-auto relative'>
          여행일지 노트 컴포넌트
        </div>
      </div>
    </div>
  );
}

export default Travelplan;
