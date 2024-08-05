import PlaceListBlock from './PlaceListBlock';
export interface ControlDisplayBlockProps {
  pointWidth: number | undefined;
  // placeSelectCount: number;
  tempPlace: string[] | [];
}
const ControlDisplayBlock = ({
  pointWidth,
  // placeSelectCount,
  tempPlace,
}: ControlDisplayBlockProps) => {
  return Number(pointWidth) > 150 ? (
    <div className='flex justify-center items-center border-none rounded-full text-xl text-white font-bold w-[20px] h-[20px] bg-gray-500/25'>
      +
    </div>
  ) : !tempPlace.length ? (
    // !placeSelectCount ?
    <div className='flex justify-center items-center border-none rounded-md bg-gray-300/50 text-sm text-gray-500/75 w-[250px] h-[80px]'>
      장소를 추가해주세요
    </div>
  ) : (
    // (console.log(tempPlace),
    tempPlace.map((item, idx) => (
      <div key={idx} className='border-solid border-2 rounded-md shadow-md w-[200px]'>
        <PlaceListBlock variant='small' item={item}></PlaceListBlock>
      </div>
    ))
    // )
  );
};

export default ControlDisplayBlock;
