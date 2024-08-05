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
  const [rcPlace, setRcPlace] = useState<string[]>(['']);
  //recommendedPlace
  const [checkedPlace, setCheckedPlace] = useState([{ name: '', isChecked: false }]);
  const [tempPlace, setTempPlace] = useState<string[]>([]);
  // const [placeSelectCount, setPlaceSelectCount] = useState(0);
  //tempPlace의 배열의 length로 카운트
  const [parentWidth, setParentWidth] = useState<number | undefined>();
  const componentRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  //페이지 첫 렌더링 시 ai가 생성해준 데이터로 설정
  useEffect(() => {
    setPeriod(4);
    setAreaName('제주');
    setRcPlace(['해수욕장', '절', '샘플3']);
  }, []);

  useEffect(() => {
    const updateWidth = () => {
      if (componentRef.current) {
        setParentWidth(componentRef.current.offsetWidth);
      }
    };
    updateWidth();
  }, [isExpanded]);
  useEffect(() => {
    // 현재 위치 가져오기
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        console.error('Error getting current position:', error);
        // 기본 위치 설정
        setLatitude(37.5665);
        setLongitude(126.978);
      }
    );
  }, []);

  function toggleExpand() {
    setIsExpanded((prev) => !prev);
  }
  // const changeSelectCount = (isChecked: boolean) => {
  //   !isChecked
  //     ? setPlaceSelectCount(placeSelectCount + 1)
  //     : setPlaceSelectCount(placeSelectCount - 1);
  // };
  const changeTempPlaceList = (item: string, isChecked: boolean) => {
    !isChecked
      ? setCheckedPlace([...checkedPlace, { name: item, isChecked: !isChecked }])
      : setCheckedPlace(checkedPlace.filter((e) => e.name !== item));
    const temp = checkedPlace.filter((place) => place.isChecked === true).map((item) => item.name);
    setTempPlace(temp);
  };

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
              <PlaceListBlock key={idx} item={item}>
                <div className='absolute right-3'>
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

        <div
          //부모 ref 가져와서
          ref={componentRef}
          className='relative border-solid border-2 border-green-500 w-[300px]'
        >
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
          {latitude !== 0 && longitude !== 0 && <Map latitude={latitude} longitude={longitude} />}
        </div>
      </div>
    </div>
  );
}

export default TravelPlan;
