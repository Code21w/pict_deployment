import '../globals.css';
import { ReactNode } from 'react';
// import Footer from '@/components/shared/Footer';
// import Header from '@/components/shared/Header';

export const metadata = {
  title: 'My App',
  description: 'This is my app',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}
