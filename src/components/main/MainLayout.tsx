import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';
import { PropsWithChildren } from 'react';

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  );
};
export default MainLayout;
