import React from 'react';
import Header from '@/components/shared/Header';

export default function SubpageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-col min-h-screen bg-white'>
      <header className='fixed top-0 left-0 w-full z-50'>
        <Header />
      </header>

      <main className='flex-grow pt-[80px] -mt-[80px]'>{children}</main>
    </div>
  );
}
