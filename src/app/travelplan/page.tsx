'use client';
import { TravelDaysSelector } from '@/components/selectDays/TravelDaysSelector';
import Map from '@/components/shared/kakaoMap';
import ControlDisplayBlock from '@/components/travel_plan/ControlDisplayBlock';
import ExpandButton from '@/components/travel_plan/ExpandButton';
import PlaceCategory from '@/components/travel_plan/PlaceCategory';
import PlaceListBlock from '@/components/travel_plan/PlaceListBlock';
import TravelPlanCheckButton from '@/components/travel_plan/TravelPlanCheckButton';
import { useEffect, useState } from 'react';

interface Place {
  id: number;
  sigungu_id: number;
  title: string;
  addr1: string;
  firstimage: string;
  map_x: number;
  map_y: number;
  category: string;
}
export interface RecommendedPlace extends Place {
  isChecked: boolean;
}
function TravelPlan() {
  // interface checkedPlaceType {
  //   name: string;
  //   isChecked: boolean;
  // }

  const [period, setPeriod] = useState<string | null>('4');
  const [areaName, setAreaName] = useState('광명');
  const [recommendedPlace, setRecommendedPlace] = useState<RecommendedPlace[]>([]);

  // const [checkedPlace, setCheckedPlace] = useState<Array<checkedPlaceType>>([]);
  const [tempPlace, setTempPlace] = useState<string[]>([]);
  // const [placeSelectCount, setPlaceSelectCount] = useState(0);
  //tempPlace의 배열의 length로 카운트
  // const [parentWidth, setParentWidth] = useState<number | undefined>();
  // const componentRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  // const location = sessionStorage.getItem('location');
  // const id = sessionStorage.getItem('id');

  //페이지 첫 렌더링 시 ai가 생성해준 데이터를 로컬 스토리지에서 가져오기

  // const place = fetch()~~~ id로 데이터 place 변수값에 담기

  const PLACE = [
    {
      id: 192,
      sigungu_id: 1,
      title: '간성향교',
      addr1: '강원특별자치도 고성군 간성읍 진부령로 2659',
      firstimage: 'NaN',
      map_x: 128.4389748268,
      map_y: 38.3778814721,
      category: '인문명소',
      isChecked: false,
    },
    {
      id: 715,
      sigungu_id: 1,
      title: '거진등대해맞이공원',
      addr1: '강원특별자치도 고성군 거진읍 거탄진로209번길 19',
      firstimage: 'NaN',
      map_x: 128.4644147196,
      map_y: 38.4489653345,
      category: '인문명소',
      isChecked: false,
    },
    {
      id: 717,
      sigungu_id: 1,
      title: '거진어촌체험휴양마을',
      addr1: '강원특별자치도 고성군 거진읍 거진리',
      firstimage: 'NaN',
      map_x: 128.4628176843,
      map_y: 38.4476432361,
      category: '인문명소',
      isChecked: false,
    },
    {
      id: 761,
      sigungu_id: 1,
      title: '건봉사',
      addr1: '강원특별자치도 고성군 거진읍 건봉사로 723',
      firstimage: 'http://tong.visitkorea.or.kr/cms/resource/49/2659849_image2_1.jpg',
      map_x: 128.3781573424,
      map_y: 38.4037217209,
      category: '인문명소',
      isChecked: false,
    },
  ];
  useEffect(() => {
    // setAreaName(location);
    setAreaName('제주');
    // setRecommendedPlace(place);
    setRecommendedPlace(PLACE);
    setTempPlace([]);
  }, []);

  function toggleExpand() {
    setIsExpanded((prev) => !prev);
  }

  // const changeTempPlaceList = (item: string, isChecked: boolean) => {
  //   const newCheckedPlace = !isChecked
  //     ? [
  //         ...checkedPlace,
  //         {
  //           name: item,
  //           isChecked: !isChecked,
  //         },
  //       ]
  //     : checkedPlace.filter((e) => e.name !== item);
  //   const temp = newCheckedPlace.filter((place) => place.isChecked).map((item) => item.name);
  //   setCheckedPlace(newCheckedPlace);
  //   setTempPlace(temp);
  // };
  const changeTempPlaceList = (item: RecommendedPlace) => {
    setRecommendedPlace((prevPlace) => {
      const newRecommendedPlace = prevPlace.map((place) => {
        if (place.id === item.id) {
          return { ...place, isChecked: !place.isChecked };
        }

        return place;
      });
      //recommendedPlace = {PLACE에서 선택한거만 isChecked = true}
      return newRecommendedPlace;
    });

    setTempPlace((prevTempPlace) => {
      let newTempPlace;
      if (!item.isChecked) {
        newTempPlace = [...(prevTempPlace ?? []), item.title];
      } else {
        newTempPlace = prevTempPlace.filter((place) => place !== item.title);
      }
      // console.log(newTempPlace);
      return newTempPlace;
    });

    // const newTempPlace = recommendedPlace.filter((place) => {
    //   place.isChecked === true;
    // });
    // console.log(newTempPlace);
    // item.isChecked = true 인거만 넣고싶어요
    // return [...prevTempPlace, item];
    // setTempPlace(newTempPlace);
  };

  // const changeTempPlaceList = (item: RecommendedPlace) => {
  //   setRecommendedPlace((prevPlace) => {
  //     const newRecommendedPlace = prevPlace.map((place) => {
  //       if (place.id === item.id) {
  //         return { ...place, isChecked: !place.isChecked };
  //       }

  //       return place;
  //     });
  //     //recommendedPlace = {PLACE에서 선택한거만 isChecked = true}
  //     return newRecommendedPlace;
  //   });

  //   setTempPlace((prevTempPlace) => {
  //     const newTempPlace = recommendedPlace.find((place) => {
  //       place.isChecked === true;
  //     });
  //     // item.isChecked = true 인거만 넣고싶어요
  //     // return [...prevTempPlace, item];
  //     return newTempPlace;
  //   });
  // };

  const resetTempPlaceList = () => {
    tempPlace.map((item) => deleteTempPlaceList(item));
    //delete 버튼을 한번에 다 누른 효과
  };
  const deleteTempPlaceList = (item: string) => {
    // console.log(item);
    setTempPlace((prevTempPlace) => {
      const newTempPlace = prevTempPlace.filter((place) => place !== item);
      //tempPlace를 item을 제외한 배열로 바꾼다.
      //recommendedplace에서 일치하는 place의 ischecked를 바꾼다.
      return newTempPlace;
    });

    setRecommendedPlace((prevPlace) => {
      const newRecommendedPlace = prevPlace.map((place) => {
        if (place.title === item) {
          return { ...place, isChecked: !place.isChecked };
        }

        return place;
      });
      //recommendedPlace = {PLACE에서 선택한거만 isChecked = false}
      return newRecommendedPlace;
    });

    //
  };
  const selectDay = (travelDays: string) => {
    setPeriod(travelDays);
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
              <PlaceListBlock key={idx} item={item.title}>
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

        <div className={`relative ${!isExpanded ? 'w-[120px] slideIn' : 'w-[300px] slideOut'} `}>
          <div
            className={`${!isExpanded ? 'flex flex-col items-center mt-5 gap-5' : 'flex flex-col items-center mt-5 gap-5 overflow-hidden'}`}
          >
            <div className='w-full flex items-center justify-around'>
              <div className='text-2xl'>{tempPlace.length}</div>
              {isExpanded && (
                <div
                  className='text-xs text-red-500 hover:cursor-pointer'
                  onClick={resetTempPlaceList}
                >
                  장소 설정 초기화
                </div>
              )}
            </div>

            <ControlDisplayBlock
              // placeSelectCount={placeSelectCount}
              isExpanded={isExpanded}
              tempPlace={tempPlace}
              deleteTempPlaceList={deleteTempPlaceList}
            />

            <ExpandButton isExpanded={isExpanded} toggleExpand={toggleExpand} />
            {/* width: 120px ~ 300px */}
          </div>
        </div>

        <div className='w-screen h-screen rounded-md'>
          <Map />
        </div>
      </div>
      <TravelDaysSelector selectDay={selectDay} />
    </div>
  );
}

export default TravelPlan;
