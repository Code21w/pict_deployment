'use client';
import ControlDisplayBlock from '@/components/travel_plan/ControlDisplayBlock';
import ExpandButton from '@/components/travel_plan/ExpandButton';
import PlaceCategory from '@/components/travel_plan/PlaceCategory';
import PlaceListBlock from '@/components/travel_plan/PlaceListBlock';
import TravelPlanCheckButton from '@/components/travel_plan/TravelPlanCheckButton';
import { useEffect, useRef, useState } from 'react';
function TravelPlan() {
  const [period, setPeriod] = useState(3);
  const [areaName, setAreaName] = useState('광명');
  const [rcPlace, setRcPlace] = useState(['']);
  const [placeSelectCount, setPlaceSelectCount] = useState(0);
  const [parentWidth, setParentWidth] = useState<number | undefined>();
  const componentRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  function toggleExpand() {
    setIsExpanded((prev) => !prev);
  }
  const changeSelectCount = (isChecked: boolean) => {
    !isChecked
      ? setPlaceSelectCount(placeSelectCount + 1)
      : setPlaceSelectCount(placeSelectCount - 1);
  };

  //페이지 첫 렌더링 시 ai가 생성해준 데이터로 설정
  useEffect(() => {
    setPeriod(4), setAreaName('제주'), setRcPlace(['해수욕장', '절', '샘플3']);
  }, []);

  useEffect(() => {
    const updateWidth = () => {
      if (componentRef.current) {
        setParentWidth(componentRef.current.offsetWidth);
      }
    };
    updateWidth();
  }, [isExpanded]);

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
              <PlaceListBlock key={idx} variant='default'>
                <div>{item}</div>
                <div className='absolute right-3'>
                  <TravelPlanCheckButton changeSelectCountFunction={changeSelectCount} />
                </div>
              </PlaceListBlock>
            ))}
          </div>
        </div>
        {/* // */}
        <div
          //부모 ref 가져와서
          ref={componentRef}
          id='temp_place_edit_container'
          className='relative  border-solid border-2 border-green-500 w-[300px] '
        >
          <div
            className={`${!isExpanded ? 'flex flex-col items-center mt-5 gap-5' : 'flex flex-col items-center mt-5 gap-5 overflow-hidden'}`}
          >
            <div>
              <div className='text-2xl'>{placeSelectCount}</div>
            </div>
            <ControlDisplayBlock pointWidth={parentWidth} placeSelectCount={placeSelectCount} />
            <div>
              <ExpandButton isExpanded={isExpanded} toggleExpand={toggleExpand} />
            </div>
            {/* width: 120px ~ 300px */}
          </div>
        </div>
        {/* // */}
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
