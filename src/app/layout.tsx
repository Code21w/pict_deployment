import './globals.css';
import Script from 'next/script';
import { ReactNode } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

export const metadata = {
  title: 'My App',
  description: 'This is my app',
};

declare global {
  interface Window {
    kakao: any;
  }
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <meta charSet='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>{metadata.title}</title>
        <meta name='description' content={metadata.description} />
      </head>
      <body className='bg-gradient-to-b from-cyan-500 to-white-500 to-90% overflow-hidden h-full min-w-[720px]'>
        <Header />
        <main className='h-full'>{children}</main>
        <Footer />
        {/* 해당 부분에 Script를 추가한다. */}
        <Script src='https://developers.kakao.com/sdk/js/kakao.js' async />
        {/* 이 두번째 Script는 kakao map을 이용하기 위한 Script이다. appkey 부분엔 발급받은 본인의 API KEY를 입력한다. */}
        <Script
          type='text/javascript'
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=c97a2941e3a63026f2461c0db2f6e7e2&autoload=false&libraries=services`}
        />
        <Script
          type='text/javascript'
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=c97a2941e3a63026f2461c0db2f6e7e2
&autoload=false&libraries=services`}
        />
      </body>
    </html>
  );
}
