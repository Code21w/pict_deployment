import Link from 'next/link';

import Join from './Join';
import Login from './Login';

/** image */
// import { Menu } from 'lucide-react';
// import logo from '../../assets/images/logo.png';

function Header() {
  return (
    <header className='z-10 sticky top-0 flex h-16 items-center gap-4 px-4 md:px-6 sm: flex justify-between'>
      <nav className='w-full h-16 flex-row gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-10'>
        <Link
          href={'/'}
          className='flex h-16 items-center gap-2 text-lg font-semibold md:text-base '
        >
          <div></div>
          <span className='sr-only'>PicT</span>
        </Link>

        <Link href={'/1'} className='text-foreground transition-colors hover:text-muted'>
          메인1
        </Link>
        <Link href={'/'} className='text-foreground transition-colors hover:text-muted'>
          메인2
        </Link>
        {/* <Link href={'/'} className='text-muted-foreground transition-colors hover:text-foreground'>
          로그인
        </Link> */}
        <Login />
        {/* <Link href={'/'} className='text-muted-foreground transition-colors hover:text-foreground'>
          회원가입
        </Link> */}
        <Join />
      </nav>
    </header>
  );
}

export default Header;
