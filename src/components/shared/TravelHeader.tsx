'use client';
import { useWindowHref } from '@/hooks/useWindowHref';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function TravelHeader() {
  const searchParams = useSearchParams();
  const index = searchParams.get('index');
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <header className='fixed left-0 w-[85px] z-1 overflow-hidden h-full justify-between'>
        <nav>
          {useWindowHref() == `http://localhost:3001/travelplan?index=${index}` ? (
            <ul className='h-full font-medium flex flex-col items-center gap-20 mt-20'>
              <li className='text-center text-base text-cyan-500/50'>
                STEP 1 <br />
                장소 선택
              </li>
              <li className='text-center text-xs text-gray-500/50'>
                <Link href='/travelItinery'>
                  STEP 2 <br /> 일정 편집
                </Link>
              </li>
            </ul>
          ) : (
            <ul className='h-full font-medium flex flex-col items-center gap-20 mt-20'>
              <li className='text-center text-xs text-gray-500/50'>
                <Link href={`/travelplan?index=${index}`}>
                  STEP 1 <br />
                  장소 선택
                </Link>
              </li>
              <li className='text-center text-base text-cyan-500/50'>
                STEP 2 <br /> 일정 편집
              </li>
            </ul>
          )}
        </nav>
      </header>
    </Suspense>
  );
}

export default TravelHeader;
