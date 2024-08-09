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
import { useCartStore } from '@/store/store';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
interface CustomError {
  response: {
    data: any;
    status: number;
    headers: string;
  };
}
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
  const { currentCart, setCurrentCart } = useCartStore();
  const [isExpanded, setIsExpanded] = useState(false);
  const [id, setId] = useState('');
  const [attractions, setAttractions] = useState<RecommendedPlace[]>([]);
  const [nature, setNature] = useState<RecommendedPlace[]>([]);
  const [activity, setActivity] = useState<RecommendedPlace[]>([]);
  const [culture, setCulture] = useState<RecommendedPlace[]>([]);
  const Router = useRouter();

  // 코치님 피드백에 따라 state수 줄이고 useEffect 4개에서 2개로 줄임
  // fetch하는 함수를 useEffect 내부에 선언하도록 함
  useEffect(() => {
    getSession();
    // getSession에서 setId(location_id)를 해줌
  }, []);

  useEffect(() => {
    if (id) {
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
        } catch (error) {
          const CustomError = error as CustomError;
          if (CustomError.response.status === 401) {
            alert('로그인해주세요');

            Router.push('/');
          }
          console.error(getErrorMessage(error));
          throw error;
        }
      };
      const setDataList = async () => {
        const arr1 = await setData('인문명소');
        setRecommendedPlace(arr1 as RecommendedPlace[]);
        setData('자연명소');
        setData('액티비티');
        setData('문화시설');
      };
      setDataList(); // id 가 바뀌면 각각의 카테고리의 받아온 배열에 isChecked: false 속성을 추가, 각각의 state를 속성을 추가한 배열로 저장
    }
  }, [id]);

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

  // TravelCheckButton 누를때 recommendedPlace의 isChecked를 반전시키고 currentCart를 갱신
  const changeCurrentCartList = (item: RecommendedPlace) => {
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

    const updateCurrentCart = () => {
      let newCart;
      // isChecked가 off 되어있었다면 배열에 장소를 추가(isChecked는 버튼 누르면 반전되지만 아직 업데이트가 되기 전이므로 off로 검사)
      if (!item.isChecked) {
        newCart = [...(currentCart ?? []), item];
      } else {
        // 반대의 경우 id가 같지 않은 장소들만 뽑아냄
        newCart = currentCart.filter((place) => place.id !== item.id);
      }
      return newCart;
    };
    setCurrentCart(updateCurrentCart());
  };

  // delete 버튼은 chageCurrentCart 함수의 ischecked == true 일때와 비슷하게 동작

  const deleteCurrentCartList = (item: RecommendedPlace) => {
    const deleteCurrentCart = () => {
      const newCart = currentCart.filter((place) => place.id !== item.id);
      // tempPlace를 item을 제외한 배열로 바꾼다.
      // recommendedplace에서 일치하는 place의 ischecked를 바꾼다.
      return newCart;
    };
    setCurrentCart(deleteCurrentCart());

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
  const resetCurrentCartList = () => {
    currentCart.map((item) =>
      setRecommendedPlace((prevPlace) => {
        const newRecommendedPlace = prevPlace.map((place) => {
          if (place.id === item.id) {
            // id를 비교하여 같을 때 isChecked만 반전
            return { ...place, isChecked: !place.isChecked };
          }
          return place;
        });
        return newRecommendedPlace;
      })
    );
    setCurrentCart([]);
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
  // const checkTempPlaceWithCategory = () => {
  //   tempPlace.map((item) => {
  //     setRecommendedPlace((prevPlace) => {
  //       const newRecommendedPlace = prevPlace.map((place) => {
  //         if (place.id === item.id) {
  //           return { ...place, isChecked: !place.isChecked };
  //         }
  //         return place;
  //       });
  //       return newRecommendedPlace;
  //     });
  //     // TempPlace가 recommendedPlace에서 순회하여 찾음
  //     // 있으면 isChecked를 on 시켜준다.
  //   });
  // };
  const checkCurrentCartWithCategory = () => {
    currentCart.map((item) => {
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
              checkTempPlaceWithCategory={checkCurrentCartWithCategory}
              // checkTempPlaceWithCategory
            />
          </div>

          <div className='list_container h-[calc(100vh_-_200px)] flex flex-col overflow-y-auto overflow-x-hidden mb-1'>
            {recommendedPlace.length > 0 ? (
              recommendedPlace.map((item, idx) => (
                <PlaceListBlock key={idx} item={item}>
                  <div className='mr-3'>
                    <TravelPlanCheckButton
                      changeTempPlaceList={changeCurrentCartList}
                      item={item}
                      // changeTempPlaceList
                    />
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
              <div className='text-2xl'>{currentCart.length}</div>
              {/* tempPlace.length */}
              {isExpanded && (
                <div
                  className='text-xs text-red-500 hover:cursor-pointer'
                  onClick={resetCurrentCartList}
                  // resetTempPlaceList
                >
                  장소 설정 초기화
                </div>
              )}
            </div>

            <ControlDisplayBlock
              // placeSelectCount={placeSelectCount}
              isExpanded={isExpanded}
              tempPlace={currentCart}
              // tempPlace
              deleteTempPlaceList={deleteCurrentCartList}
              // deleteTempPlaceList
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
