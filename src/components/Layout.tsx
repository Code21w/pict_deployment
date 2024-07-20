import Footer from './Footer';
import Header from './Header';

type LayoutProps = {
  children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Header />
      <main className='h-full'>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
