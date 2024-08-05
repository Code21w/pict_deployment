function TravelHeader() {
  return (
    <header className='fixed left-0 w-[85px] z-1 overflow-hidden h-full justify-between'>
      <nav className='h-full font-medium flex flex-col items-center gap-20 mt-[20px]'>
        <ul>
          <li className='text-center text-base text-cyan-500'>
            STEP 1 <br />
            장소 선택
          </li>
          <li className='text-center text-xs text-gray-500/50'>
            STEP 2 <br /> 일정 편집
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default TravelHeader;
