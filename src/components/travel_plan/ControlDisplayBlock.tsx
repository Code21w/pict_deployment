'use client';
import { RecommendedPlace } from '@/app/travelplan/page';
import TrashBin from '@/assets/images/trash_bin.png';
import PlaceListBlock from '@/components/travel_plan/PlaceListBlock';
import { cn } from '@/lib/utils';
import Image from 'next/image';
export interface ControlDisplayBlockProps {
  isExpanded: boolean;
  tempPlace: RecommendedPlace[];
  deleteTempPlaceList: Function;
}

const ControlDisplayBlock = ({
  isExpanded,
  tempPlace,
  deleteTempPlaceList,
}: ControlDisplayBlockProps) => {
  const renderer = () => {
    const handleClick = (item: RecommendedPlace) => {
      deleteTempPlaceList(item);
    };
    const renderPlaceCount = () => {
      return tempPlace.map((item, idx) => (
        <div
          key={item.id}
          className='flex items-center justify-center bg-cyan-500/50 border-none rounded-full w-[24px] h-[24px] text-white text-sm'
        >
          {idx + 1}
        </div>
      ));
    };
    if (isExpanded) {
      if (tempPlace.length) {
        return tempPlace.map((item, idx) => (
          <div className='flex gap-3 items-center'>
            <div className='flex items-center justify-center bg-cyan-500/50 border-none rounded-full w-[24px] h-[24px] text-white text-sm'>
              {idx + 1}
            </div>
            <div
              key={item.id}
              className='border-solid border-b-2 border-l-2 rounded-md mb-3 w-[200px]'
            >
              <PlaceListBlock variant='small' item={item}>
                <div
                  className='min-w-[24px] min-h-[24px] hover:cursor-pointer'
                  onClick={() => handleClick(item)}
                >
                  <Image src={TrashBin} alt='delete' />
                </div>
              </PlaceListBlock>
            </div>
          </div>
        ));
      } else {
        return (
          <div className='flex justify-center items-center border-none rounded-md bg-gray-300/50 text-sm text-gray-500/75 w-[250px] h-[80px]'>
            장소를 추가해주세요
          </div>
        );
      }
    } else {
      if (tempPlace.length) {
        return <div className='flex flex-col gap-10'>{renderPlaceCount()}</div>;
      } else
        return (
          <div
            className={cn(
              'flex justify-center items-center border-none rounded-full text-xl text-white font-bold w-[20px] h-[20px] bg-gray-500/25'
            )}
          >
            +
          </div>
        );
    }
  };

  return <div>{renderer()}</div>;
};

export default ControlDisplayBlock;
