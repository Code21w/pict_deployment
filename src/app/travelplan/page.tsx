'use client';
import { getErrorMessage } from '@/api/errorHandler';
import { fetchPlace } from '@/api/travelPlanApi';
import SadCat from '@/assets/images/sadcat.webp';
import { TravelDaysSelector } from '@/components/selectDays/TravelDaysSelector';
import Map from '@/components/shared/kakaoMap';
import ControlDisplayBlock from '@/components/travel_plan/ControlDisplayBlock';
import ExpandButton from '@/components/travel_plan/ExpandButton';
import PlaceCategory from '@/components/travel_plan/PlaceCategory';
import PlaceListBlock from '@/components/travel_plan/PlaceListBlock';
import TravelPlanCheckButton from '@/components/travel_plan/TravelPlanCheckButton';
import useCartStore from '@/store/store';
import Image from 'next/image';
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
  const [period, setPeriod] = useState<string | null>('?');
  const [areaName, setAreaName] = useState('중구');
  const [recommendedPlace, setRecommendedPlace] = useState<RecommendedPlace[]>([]);
  const [tempPlace, setTempPlace] = useState<RecommendedPlace[]>([]);

  const [isExpanded, setIsExpanded] = useState(false);
  const setCurrentCart = useCartStore((state) => state.setCurrentCart);
  const currentCart = useCartStore((state) => state.currentCart);
  const [id, setId] = useState('');
  const [attractions, setAttractions] = useState<RecommendedPlace[]>([]);
  const [nature, setNature] = useState<RecommendedPlace[]>([]);
  const [activity, setActivity] = useState<RecommendedPlace[]>([]);
  const [culture, setCulture] = useState<RecommendedPlace[]>([]);

  useEffect(() => {
    getSession();
    //getSession에서 setId(location_id)를 해줌
    setTempPlace([]);
  }, []);

  useEffect(() => {
    if (id) {
      setDataList(); //id 가 바뀌면 각각의 카테고리의 받아온 배열에 isChecked: false 속성을 추가, 각각의 state를 속성을 추가한 배열로 저장
    }
  }, [id]);

  useEffect(() => {
    setCurrentCart(tempPlace);
    // useCartStore.setState(() => ({ currentCart: tempPlace }));와 동일
    // 이건 currentCart에 바로 newCart 넣어버리니 업데이트가 한박자 느림
  }, [tempPlace]);

  useEffect(() => {
    // 그래서 currentCart가 업데이트 될때 렌더링 해주도록함
  }, [currentCart]);

  const setData = async (category: string) => {
    try {
      if (id !== '') {
        const result = await fetchPlace(id, category);

        const placeData: Place[] | [] = result.data;

        if (category === '인문명소') {
          const newAttraction = placeData.map((item) => ({ ...item, isChecked: false }));
          setAttractions(newAttraction);
          return newAttraction;
        } else if (category === '자연명소') {
          const newNature = placeData.map((item) => ({ ...item, isChecked: false }));
          setNature(newNature);
        } else if (category === '액티비티') {
          const newActivity = placeData.map((item) => ({ ...item, isChecked: false }));
          setActivity(newActivity);
        } else if (category === '문화시설') {
          const newCulture = placeData.map((item) => ({ ...item, isChecked: false }));
          setCulture(newCulture);
        }
      } else {
        console.error('Response array is empty or undefined');
        return '정보를 불러올 수 없습니다.'; // 기본값 또는 적절한 에러 메시지 제공
      }
    } catch (error: unknown) {
      console.error(getErrorMessage(error));
      throw error;
    }
  };
  const setDataList = async () => {
    const a = await setData('인문명소');
    setRecommendedPlace(a as RecommendedPlace[]);
    setData('자연명소');
    setData('액티비티');
    setData('문화시설');
  };

  // 세션 스토리지에서 location id와 location 이름을 가져오는함수
  const getSession = () => {
    const uploadFileResponseString = sessionStorage.getItem('uploadFileResponse');
    if (uploadFileResponseString) {
      const uploadFileResponse = JSON.parse(uploadFileResponseString);

      if (
        uploadFileResponse.result &&
        uploadFileResponse.result[0] &&
        uploadFileResponse.result[0].location
      ) {
        const fullLocation = uploadFileResponse.result[0].location;
        const location_id = uploadFileResponse.result[0].location_id;
        // 전체 위치 문자열을 공백으로 나누고 마지막 요소(도시명)를 가져옴
        const locationParts = fullLocation.split(' ');
        const cityName = locationParts[locationParts.length - 1];

        setAreaName(cityName);
        setId(location_id);
      } else {
        console.error('Location data is missing in the uploadFileResponse.');
      }
    } else {
      console.error('uploadFileResponse is not available in sessionStorage.');
    }
  };

  // TravelCheckButton 누를때 recommendedPlace의 isChecked를 반전시키고 TempPlace를 갱신
  const changeTempPlaceList = (item: RecommendedPlace) => {
    setRecommendedPlace((prevPlace) => {
      const newRecommendedPlace = prevPlace.map((place) => {
        if (place.id === item.id) {
          // id를 비교하여 같을 때 isChecked만 반전
          return { ...place, isChecked: !place.isChecked };
        }

        return place;
      });
      return newRecommendedPlace;
    });

    setTempPlace((prevTempPlace) => {
      let newTempPlace;
      // isChecked가 off 되어있었다면 배열에 장소를 추가(isChecked는 버튼 누르면 반전되지만 아직 업데이트가 되기 전이므로 off로 검사)
      if (!item.isChecked) {
        newTempPlace = [...(prevTempPlace ?? []), item];
      } else {
        // 반대의 경우 id가 같지 않은 장소들만 뽑아냄
        newTempPlace = prevTempPlace.filter((place) => place.id !== item.id);
      }
      return newTempPlace;
    });
  };

  // delete 버튼은 chageTempPlaceList 함수의 ischecked == true 일때와 비슷하게 동작
  const deleteTempPlaceList = (item: RecommendedPlace) => {
    setTempPlace((prevTempPlace) => {
      const newTempPlace = prevTempPlace.filter((place) => place.id !== item.id);
      // tempPlace를 item을 제외한 배열로 바꾼다.
      // recommendedplace에서 일치하는 place의 ischecked를 바꾼다.
      return newTempPlace;
    });

    setRecommendedPlace((prevPlace) => {
      const newRecommendedPlace = prevPlace.map((place) => {
        if (place.id === item.id) {
          // id를 비교하여 같을 때 isChecked만 반전
          return { ...place, isChecked: !place.isChecked };
        }
        return place;
      });
      return newRecommendedPlace;
    });
  };

  // reset 버튼은 delete 버튼을 한번에 다 누른 효과
  const resetTempPlaceList = () => {
    tempPlace.map((item) => deleteTempPlaceList(item));
  };

  // 카테고리에 따라 recommendedPlaceList를 갱신
  const changeCategory = (Key: string) => {
    const key = Key;
    if (key === 'attractions') setRecommendedPlace(attractions);
    else if (key === 'nature') setRecommendedPlace(nature);
    else if (key === 'culture') setRecommendedPlace(culture);
    else if (key === 'activity') setRecommendedPlace(activity);
  };

  // 카테고리가 바뀔 때 isChecked가 false로 돌아가므로 다시 true로 만들어줌
  const checkTempPlaceWithCategory = () => {
    tempPlace.map((item) => {
      setRecommendedPlace((prevPlace) => {
        const newRecommendedPlace = prevPlace.map((place) => {
          if (place.id === item.id) {
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

  // 여행 기간 설정
  const selectDay = (travelDays: string) => {
    setPeriod(travelDays);
  };

  // 확장 버튼 토글
  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
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
              changeCategory={changeCategory}
              checkTempPlaceWithCategory={checkTempPlaceWithCategory}
            />
          </div>

          <div className='list_container h-[calc(100vh_-_200px)] flex flex-col overflow-y-auto overflow-x-hidden mb-1'>
            {recommendedPlace.length > 0 ? (
              recommendedPlace.map((item, idx) => (
                <PlaceListBlock key={idx} item={item}>
                  <div className='mr-3'>
                    <TravelPlanCheckButton changeTempPlaceList={changeTempPlaceList} item={item} />
                  </div>
                </PlaceListBlock>
              ))
            ) : (
              <div className='h-full flex flex-col justify-center items-center text-gray-500'>
                <Image src={SadCat} width={128} height={128} alt='sadCat.png' />
                추천해줄 장소가 아직 없습니다 ㅜㅜ
              </div>
            )}
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
