import TravelHeader from '@/components/shared/TravelHeader';
import { PropsWithChildren } from 'react';
import '../globals.css';
export const metadata = {
  title: 'My App',
  description: 'This is my app',
};

export default function TravelPlanLayout({ children }: PropsWithChildren) {
  return (
    <div className='bg-white'>
      <TravelHeader />
      <div className='ml-[85px] h-full'>{children}</div>
    </div>
  );
}
