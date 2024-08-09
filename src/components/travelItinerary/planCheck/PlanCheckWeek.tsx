// components/PlanCheck/PlanCheckWeek.tsx

function PlanCheckWeek() {
  return (
    <div className='absolute top-0 left-[120px] right-0 bottom-0 '>
      <div className='w-full h-full bg-white border-2 border-gray-300 p-4 overflow-auto'>
        <div className='flex justify-start gap-4'>
          <p className='text-4xl font-bold text-black md:text-3xl lg:text-5xl'>제주</p>
          <div className='flex items-end'>
            <p className='text-xl font-bold text-gray-500 mt-2 md:text-xl lg:text-xl'>
              5일 여행 계획
            </p>
          </div>
        </div>
        <div className='grid grid-cols-1 gap-4 grid-cols-5 mt-8'>
          {/* Day 1 카드 */}
          <div className='bg-white p-6 rounded-lg shadow'>
            <p className='text-2xl font-bold text-start text-black mb-4'>Day 1</p>
            <div className='mt-4 flex flex-col items-center'>
              <img
                src='screenshot-2024-08-07-at-3.54.34-pm-2.png'
                className='w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-md'
                alt='광명동굴'
              />
              <p className='mt-4 text-lg font-bold text-black'>광명동굴</p>
            </div>
          </div>

          {/* Day 2 카드 */}
          <div className='bg-white p-6 rounded-lg shadow'>
            <p className='text-2xl font-bold text-start text-black mb-4'>Day 2</p>
            <div className='mt-4 flex flex-col items-center'>
              <img
                src='screenshot-2024-08-07-at-3.54.34-pm-2.png'
                className='w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-md'
                alt='광명동굴'
              />
              <p className='mt-4 text-lg font-bold text-black'>광명동굴</p>
            </div>
          </div>

          {/* Day 3 카드 */}
          <div className='bg-white p-6 rounded-lg shadow'>
            <p className='text-2xl font-bold text-start text-black mb-4'>Day 3</p>
            <div className='mt-4 flex flex-col items-center'>
              <img
                src='screenshot-2024-08-07-at-3.54.34-pm-2.png'
                className='w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-md'
                alt='광명동굴'
              />
              <p className='mt-4 text-lg font-bold text-black'>광명동굴</p>
            </div>
          </div>

          {/* Day 4 카드 */}
          <div className='bg-white p-6 rounded-lg shadow'>
            <p className='text-2xl font-bold text-start text-black mb-4'>Day 4</p>
            <div className='mt-4 flex flex-col items-center'>
              <img
                src='screenshot-2024-08-07-at-3.54.34-pm-2.png'
                className='w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-md'
                alt='광명동굴'
              />
              <p className='mt-4 text-lg font-bold text-black'>광명동굴</p>
            </div>
          </div>

          {/* Day 5 카드 */}
          <div className='bg-white p-6 rounded-lg shadow'>
            <p className='text-2xl font-bold text-start text-black mb-4'>Day 5</p>
            <div className='mt-4 flex flex-col items-center'>
              <img
                src='screenshot-2024-08-07-at-3.54.34-pm-2.png'
                className='w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-md'
                alt='광명동굴'
              />
              <p className='mt-4 text-lg font-bold text-black'>광명동굴</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlanCheckWeek;
