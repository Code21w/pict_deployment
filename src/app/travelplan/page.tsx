'use client';
import Map from '@/components/shared/kakaoMap';
import ControlDisplayBlock from '@/components/travel_plan/ControlDisplayBlock';
import ExpandButton from '@/components/travel_plan/ExpandButton';
import PlaceCategory from '@/components/travel_plan/PlaceCategory';
import PlaceListBlock from '@/components/travel_plan/PlaceListBlock';
import TravelPlanCheckButton from '@/components/travel_plan/TravelPlanCheckButton';
import { useEffect, useRef, useState } from 'react';
function TravelPlan() {
  const [period, setPeriod] = useState(3);
  const [areaName, setAreaName] = useState('광명');
  const [recommendedPlace, setRecommendedPlace] = useState<string[]>(['']);

  const [checkedPlace, setCheckedPlace] = useState<Array<checkedPlaceType>>([]);
  const [tempPlace, setTempPlace] = useState<string[]>([]);
  // const [placeSelectCount, setPlaceSelectCount] = useState(0);
  //tempPlace의 배열의 length로 카운트
  const [parentWidth, setParentWidth] = useState<number | undefined>();
  const componentRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  //페이지 첫 렌더링 시 ai가 생성해준 데이터로 설정
  interface checkedPlaceType {
    name: string;
    isChecked: boolean;
  }
  useEffect(() => {
    setPeriod(4);
    setAreaName('제주');
    setRecommendedPlace([
      '해수욕장',
      '절',
      '샘플3',
      '2',
      '23',
      '24',
      '25',
      '26',
      '27',
      '28',
      '29',
      '30',
      '31',
      '32',
      '33',
      '200',
      '201',
      '202',
      '203',
      '204',
      '205',
      '206',
      '207',
      '끝',
    ]);
  }, []);

  useEffect(() => {
    const updateWidth = () => {
      if (componentRef.current) {
        setParentWidth(componentRef.current.offsetWidth);
      }
    };
    updateWidth();
  }, [isExpanded]);
  // useEffect(() => {
  //   // 현재 위치 가져오기
  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //       setLatitude(position.coords.latitude);
  //       setLongitude(position.coords.longitude);
  //     },
  //     (error) => {
  //       console.error('Error getting current position:', error);
  //       // 기본 위치 설정
  //       setLatitude(37.5665);
  //       setLongitude(126.978);
  //     }
  //   );
  // }, []);

  function toggleExpand() {
    setIsExpanded((prev) => !prev);
  }

  // const changeTempPlaceList = (item: string, isChecked: boolean) => {
  //   !isChecked
  //     ? setCheckedPlace([...checkedPlace, { name: item, isChecked: !isChecked }])
  //     : setCheckedPlace(checkedPlace.filter((e) => e.name !== item));
  //   const temp = checkedPlace.filter((place) => place.isChecked === true).map((item) => item.name);
  //   setTempPlace(temp);
  // };
  const changeTempPlaceList = (item: string, isChecked: boolean) => {
    const newCheckedPlace = !isChecked
      ? [
          ...checkedPlace,
          {
            name: item,
            isChecked: !isChecked,
          },
        ]
      : checkedPlace.filter((e) => e.name !== item);
    const temp = newCheckedPlace.filter((place) => place.isChecked).map((item) => item.name);
    setCheckedPlace(newCheckedPlace);
    setTempPlace(temp);
  };

  return (
    <div className='border-solid border-2 h-screen flex overflow-hidden'>
      <div className='relative flex max-h-full'>
        <div className='relative max-w-[300px]'>
          <div className='my-5 flex flex-col overflow-hidden'>
            <div className='text-xl'>{areaName}</div>
            <div className='text-base text-gray-500/75'>{`설정하신 여행기간은 ${period}일 입니다`}</div>
          </div>

          <div className='flex my-6 gap-2 w-[300px]'>
            <PlaceCategory />
          </div>

          <div className='list_container h-[calc(100vh_-_250px)] flex flex-col overflow-auto mb-1'>
            {recommendedPlace.map((item, idx) => (
              <PlaceListBlock key={idx} item={item}>
                <div className='mr-1'>
                  <TravelPlanCheckButton
                    // changeSelectCount={changeSelectCount}
                    changeTempPlaceList={changeTempPlaceList}
                    item={item}
                  />
                </div>
              </PlaceListBlock>
            ))}
          </div>
        </div>

        <div ref={componentRef} className='relative w-[300px]'>
          <div
            className={`${!isExpanded ? 'flex flex-col items-center mt-5 gap-5' : 'flex flex-col items-center mt-5 gap-5 overflow-hidden'}`}
          >
            <div>
              <div className='text-2xl'>{tempPlace.length}</div>
              {/* {placeSelectCount} */}
            </div>
            <ControlDisplayBlock
              pointWidth={parentWidth}
              // placeSelectCount={placeSelectCount}
              tempPlace={tempPlace}
            />

            <ExpandButton
              componentRef={componentRef}
              isExpanded={isExpanded}
              toggleExpand={toggleExpand}
            />
            {/* width: 120px ~ 300px */}
          </div>
        </div>

        <div className='border-solid border-2 border-red-500 w-screen h-screen rounded-md border max-h-full overflow-auto relative'>
          <Map latitude={latitude} longitude={longitude} />
        </div>
      </div>
    </div>
  );
}

export default TravelPlan;
