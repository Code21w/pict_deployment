import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'My App',
  description: 'This is my app',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <meta charSet='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>{metadata.title}</title>
        <meta name='description' content={metadata.description} />
      </head>
      <body>{children}</body>
    </html>
  );
}
