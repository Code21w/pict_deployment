import Link from 'next/link';

import Join from '@/components/login-join/Join';
import Login from '@/components/login-join/Login';

function Header() {
  return (
    <header className='z-10 sticky top-0 flex h-16 items-center gap-4 px-4 md:px-6 flex justify-between'>
      <nav>
        <ul className='w-full flex h-16 flex-row gap-6 text-lg font-medium  lg:gap-10'>
          <li>
            <Link
              href={'/'}
              className='flex h-16 items-center gap-2 text-lg font-semibold md:text-base '
            >
              <span className='sr-only'>PicT</span>
            </Link>
          </li>
          <li>
            <Link href={'/'} className='text-foreground transition-colors hover:text-muted'>
              메인1
            </Link>
          </li>
          <li>
            <Link
              href={'/travelplan'}
              className='text-foreground transition-colors hover:text-muted'
            >
              여행일지
            </Link>
          </li>
          <li>
            <Login />
          </li>
          <li>
            <Join />
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
