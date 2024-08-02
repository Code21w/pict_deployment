'use client';
import ImageIcon from '@/assets/images/image_icon.png';
import PlaceCategory from '@/components/travel_plan/PlaceCategory';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
function TravelPlan() {
  const [period, setPeriod] = useState(3);
  const [areaName, setAreaName] = useState('광명');
  const [rcPlace, setRcPlace] = useState(['']);
  const [placeSelectCount, setPlaceSelectCount] = useState(0);
  const [btnActive, setBtnActive] = useState(false);
  const [width, setWidth] = useState(50);
  //페이지 첫 렌더링 시 ai가 생성해준 데이터로 설정
  useEffect(() => {
    setPeriod(4), setAreaName('제주'), setRcPlace(['해수욕장', '절', '샘플3']);
  }, []);
  useEffect(() => {}, [btnActive]);

  function checkToggle() {
    if (btnActive === false) setBtnActive(true);
    else setBtnActive(false);
  }
  function toggleActive(e: React.MouseEvent<HTMLButtonElement>) {
    const target = e.target as HTMLButtonElement;
    if (target.value === 'off') {
      target.value = 'on';
      target.innerHTML = '&#10004';
      //className 속성에서 원하는 거만 추가하고 싶은데 전체를 지정해줘야 하는 문제가 발생..
      target.className =
        'inline-flex items-center justify-center whitespace-nowrap border-none w-1 h-10 px-4 py-2 rounded-md bg-cyan-500/50 text-white';
    } else {
      target.value = 'off';
      target.innerHTML = '+';
      target.className =
        'inline-flex items-center justify-center whitespace-nowrap border border-input w-1 h-10 px-4 py-2 rounded-md bg-accent text-2xl text-gray-500/50 hover:bg-accent hover:text-accent-foreground';
    }
  }
  function toggleExpandButton(e: React.MouseEvent<HTMLButtonElement>) {
    const target = e.target as HTMLButtonElement;
    if (target.value === 'off') {
      target.value = 'on';
      target.innerHTML = '<';
      setWidth(300);
      const temp = document.getElementById('temp_place_edit_container');

      temp
        ? (temp.className = 'slideOut relative border-solid border-2 border-green-500 w-[300px]')
        : '';
    } else {
      target.value = 'off';
      target.innerHTML = '>';
      setWidth(50);
      const temp = document.getElementById('temp_place_edit_container');

      temp
        ? (temp.className = 'slideIn relative border-solid border-2 border-green-500 w-[75px]')
        : '';
    }
  }

  return (
    <div className='border-solid border-2 flex h-screen overflow-hidden'>
      <div className='relative border-solid border-2 flex max-h-full'>
        <div className='relative border-solid border-2 border-blue-500 max-w-[300px]'>
          <div className='my-5 flex flex-col overflow-hidden'>
            <div className='text-xl'>{areaName}</div>
            <div className='text-base text-gray-500/75'>{`설정하신 여행기간은 ${period}일 입니다`}</div>
          </div>

          <div className='flex my-6 gap-2 w-[300px]'>
            <PlaceCategory />
          </div>

          <div className='list_container flex flex-col border-solid border-2 box-content overflow-auto'>
            {rcPlace.map((item, idx) => (
              <div className='list_component flex items-center border-solid border-2 w-full min-h-[100px] w-[300px]'>
                <div className='image_component border-solid border-2 rounded-md w-[64px] h-[64px] mx-[15px]'>
                  <Image
                    src={ImageIcon}
                    alt='recommended_place'
                    className='object-scale-down w-[64px] h-[64px]'
                  ></Image>
                </div>
                <div>{item}</div>
                <div className='absolute right-3'>
                  <Button
                    key={idx}
                    value='off'
                    className='w-1 bg-accent text-2xl text-gray-500/50'
                    variant='outline'
                    onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                      checkToggle();
                      toggleActive(e);
                    }}
                  >
                    +
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          id='temp_place_edit_container'
          className='relative border-solid border-2 border-green-500 w-[75px]'
        >
          <div>
            <div className='text-4xl'>{placeSelectCount}</div>
          </div>
          <Button
            value='off'
            className='absolute z-10 -right-11 top-[450px] hover:cursor-pointer'
            onClick={(e) => toggleExpandButton(e)}
          >
            {'>'}
          </Button>
        </div>
        <div className='border-solid border-2 border-red-500 w-screen h-screen rounded-md border max-h-full overflow-auto relative'>
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
