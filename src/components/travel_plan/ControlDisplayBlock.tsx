// 'use client';

// import PlaceListBlock from '@/components/travel_plan/PlaceListBlock';
// export interface ControlDisplayBlockProps {
//   pointWidth: number | undefined;
//   // placeSelectCount: number;
//   tempPlace: string[] | [];
// }
// const ControlDisplayBlock = ({
//   pointWidth,
//   // placeSelectCount,
//   tempPlace,
// }: ControlDisplayBlockProps) => {
//   return Number(pointWidth) > 150 ? (
//     <div className='flex justify-center items-center border-none rounded-full text-xl text-white font-bold w-[20px] h-[20px] bg-gray-500/25'>
//       +
//     </div>
//   ) : !tempPlace.length ? (
//     // !placeSelectCount ?
//     <div className='flex justify-center items-center border-none rounded-md bg-gray-300/50 text-sm text-gray-500/75 w-[250px] h-[80px]'>
//       장소를 추가해주세요
//     </div>
//   ) : (
//     // (console.log(tempPlace),
//     tempPlace.map((item, idx) => (
//       <div key={idx} className='border-solid border-2 rounded-md w-[200px]'>
//         <PlaceListBlock variant='small' item={item}></PlaceListBlock>
//       </div>
//     ))
//     // )
//   );
// };

// export default ControlDisplayBlock;
'use client';

import PlaceListBlock from '@/components/travel_plan/PlaceListBlock';
import { cn } from '@/lib/utils';
export interface ControlDisplayBlockProps {
  isExpanded: boolean;
  tempPlace: string[];
}

const ControlDisplayBlock = ({ isExpanded, tempPlace }: ControlDisplayBlockProps) => {
  const renderer = () => {
    const renderPlaceCount = () => {
      return tempPlace.map((item, idx) => (
        <div className='flex items-center justify-center bg-cyan-500/50 border-none rounded-full w-[24px] h-[24px] text-white text-sm'>
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
            <div key={idx} className='border-solid border-2 rounded-md w-[200px]'>
              <PlaceListBlock variant='small' item={item}></PlaceListBlock>
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
    // if (!isExpanded) {
    //   return (
    //     <div
    //       className={cn(
    //         'flex justify-center items-center border-none rounded-full text-xl text-white font-bold w-[20px] h-[20px] bg-gray-500/25'
    //       )}
    //     >
    //       +
    //     </div>
    //   );
    // } else if (!tempPlace.length) {
    //   return (
    //     <div className='flex justify-center items-center border-none rounded-md bg-gray-300/50 text-sm text-gray-500/75 w-[250px] h-[80px]'>
    //       장소를 추가해주세요
    //     </div>
    //   );
    // } else {
    //   return tempPlace.map((item, idx) => (
    //     <div className='flex gap-3 items-center'>
    //       <div className='flex items-center justify-center bg-cyan-500/50 border-none rounded-full w-[24px] h-[24px] text-white text-sm'>
    //         {idx + 1}
    //       </div>
    //       <div key={idx} className='border-solid border-2 rounded-md w-[200px]'>
    //         <PlaceListBlock variant='small' item={item}></PlaceListBlock>
    //       </div>
    //     </div>
    //   ));
    // }
  };

  return <div>{renderer()}</div>;
};

export default ControlDisplayBlock;
