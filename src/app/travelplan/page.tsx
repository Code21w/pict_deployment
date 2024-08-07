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

  const [period, setPeriod] = useState<string | null>('?');
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

  const PLACE_1 = [
    {
      id: 192,
      sigungu_id: 1,
      title: '간성향교',
      addr1: '강원특별자치도 고성군 간성읍 진부령로 2659',
      firstimage: 'NaN',
      map_x: 128.4389748268,
      map_y: 38.3778814721,
      category: '인문명소',
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
    },
    {
      id: 12041,
      sigungu_id: 1,
      title: '오호어촌체험마을',
      addr1: '강원특별자치도 고성군 심층수길 40-20',
      firstimage: 'http://tong.visitkorea.or.kr/cms/resource/18/863118_image2_1.jpg',
      map_x: 128.5290848757,
      map_y: 38.3270974802,
      category: '인문명소',
    },
    {
      id: 12856,
      sigungu_id: 1,
      title: '울산바위촬영휴게소',
      addr1: '강원특별자치도 고성군 토성면 미시령로 2653',
      firstimage: 'NaN',
      map_x: 128.496627685,
      map_y: 38.2072219286,
      category: '인문명소',
    },
    {
      id: 13294,
      sigungu_id: 1,
      title: '육송정 홍교',
      addr1: '강원특별자치도 고성군 해상리 1041',
      firstimage: 'NaN',
      map_x: 128.4088384086,
      map_y: 38.3867298548,
      category: '인문명소',
    },
    {
      id: 13513,
      sigungu_id: 1,
      title: '이기붕별장',
      addr1: '강원특별자치도 고성군 거진읍 화진포길 280',
      firstimage: 'http://tong.visitkorea.or.kr/cms/resource/41/3007941_image2_1.jpg',
      map_x: 128.4430325955,
      map_y: 38.4725343883,
      category: '인문명소',
    },
    {
      id: 13518,
      sigungu_id: 1,
      title: '이덕균가옥',
      addr1: '강원특별자치도 고성군 죽왕면 송지호로 198-12',
      firstimage: 'NaN',
      map_x: 128.5035454892,
      map_y: 38.3285440368,
      category: '인문명소',
    },
    {
      id: 13566,
      sigungu_id: 1,
      title: '이승만별장(고성)',
      addr1: '강원특별자치도 고성군 이승만별장길 33 이승만별장',
      firstimage: 'http://tong.visitkorea.or.kr/cms/resource/01/2600601_image2_1.jpg',
      map_x: 128.4363027064,
      map_y: 38.4708816727,
      category: '인문명소',
    },
  ];
  const PLACE_2 = [
    {
      id: 124,
      sigungu_id: 1,
      title: '가진항',
      addr1: '강원특별자치도 고성군 죽왕면 가진해변길 121-12',
      firstimage: 'NaN',
      map_x: 128.5133183548,
      map_y: 38.3682229327,
      category: '자연명소',
    },
    {
      id: 125,
      sigungu_id: 1,
      title: '가진해변',
      addr1: '강원특별자치도 고성군 죽왕면 가진리 495-6',
      firstimage: 'NaN',
      map_x: 128.4546324706,
      map_y: 38.4428575247,
      category: '자연명소',
    },
    {
      id: 712,
      sigungu_id: 1,
      title: '거진 등대',
      addr1: '강원특별자치도 고성군 거진읍 등대길 17-2',
      firstimage: 'http://tong.visitkorea.or.kr/cms/resource/14/2714114_image2_1.jpg',
      map_x: 128.462573187,
      map_y: 38.4500568379,
      category: '자연명소',
    },
    {
      id: 713,
      sigungu_id: 1,
      title: '거진11리해변',
      addr1: '강원특별자치도 고성군 거진읍 거진리',
      firstimage: 'NaN',
      map_x: 128.4536129346,
      map_y: 38.4487262643,
      category: '자연명소',
    },
    {
      id: 714,
      sigungu_id: 1,
      title: '거진1리해변',
      addr1: '강원특별자치도 고성군 거진읍 거진1리',
      firstimage: 'http://tong.visitkorea.or.kr/cms/resource/47/176147_image2_1.jpg',
      map_x: 128.4547464127,
      map_y: 38.4408494282,
      category: '자연명소',
    },
    {
      id: 718,
      sigungu_id: 1,
      title: '거진항',
      addr1: '강원특별자치도 고성군 거진읍 거진항1길 62-3',
      firstimage: 'NaN',
      map_x: 128.4598152167,
      map_y: 38.4465127542,
      category: '자연명소',
    },
  ];
  const PLACE_3 = [
    {
      id: 404,
      sigungu_id: 1,
      title: '강원도 세계잼버리 수련장',
      addr1: '강원특별자치도 고성군 토성면 잼버리로 244',
      firstimage: 'NaN',
      map_x: 128.4976743306,
      map_y: 38.2226840374,
      category: '액티비티',
    },
    {
      id: 420,
      sigungu_id: 1,
      title: '강원평화누리길 16코스 고성 울산바위비경길',
      addr1: '강원특별자치도 고성군 간성읍 고성중앙길 9',
      firstimage: 'http://tong.visitkorea.or.kr/cms/resource/78/2747978_image2_1.jpg',
      map_x: 128.4678859929,
      map_y: 38.3806733748,
      category: '액티비티',
    },
  ];
  const PLACE_4 = [
    {
      id: 1218,
      sigungu_id: 1,
      title: '고성 DMZ박물관',
      addr1: '강원특별자치도 고성군 현내면 통일전망대로 369',
      firstimage: 'http://tong.visitkorea.or.kr/cms/resource/51/2921751_image2_1.jpg',
      map_x: 128.3826570629,
      map_y: 38.5763238583,
      category: '문화시설',
    },
  ];

  useEffect(() => {
    // setAreaName(location);
    setAreaName('제주');
    // setRecommendedPlace(place);
    const place = addCheckProp();
    setRecommendedPlace(place.attractions);
    setTempPlace([]);
  }, []);

  const addCheckProp = () => {
    const attractions = PLACE_1.map((item) => ({ ...item, isChecked: false }));
    const nature = PLACE_2.map((item) => ({ ...item, isChecked: false }));
    const activity = PLACE_3.map((item) => ({ ...item, isChecked: false }));
    const culture = PLACE_4.map((item) => ({ ...item, isChecked: false }));
    return { attractions, nature, activity, culture };
  };

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

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
  const storeCategory = (Key: string) => {
    const key = Key;
    const place = addCheckProp();
    if (key === 'attractions') setRecommendedPlace(place.attractions);
    else if (key === 'nature') setRecommendedPlace(place.nature);
    else if (key === 'culture') setRecommendedPlace(place.culture);
    else setRecommendedPlace(place.activity);
  };
  const checkTempPlaceWithCategory = () => {
    tempPlace.map((item) => {
      setRecommendedPlace((prevPlace) => {
        const newRecommendedPlace = prevPlace.map((place) => {
          if (place.title === item) {
            return { ...place, isChecked: !place.isChecked };
          }
          return place;
        });
        return newRecommendedPlace;
      });
      // TempPlace가 recommendedPlace에서 순회하여 찾음
      // 있으면 isChecked를 on 시켜준다.
    });
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
            <PlaceCategory
              storeCategory={storeCategory}
              checkTempPlaceWithCategory={checkTempPlaceWithCategory}
            />
          </div>

          <div className='list_container h-[calc(100vh_-_200px)] flex flex-col overflow-y-auto overflow-x-hidden mb-1'>
            {recommendedPlace.map((item, idx) => (
              <PlaceListBlock key={idx} item={item.title}>
                <div className='mr-3'>
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
          className={`relative h-[calc(100vh_-_100px)] overflow-x-visible overflow-y-auto ${!isExpanded ? 'w-[120px] slideIn' : 'w-[350px] slideOut'} `}
        >
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
