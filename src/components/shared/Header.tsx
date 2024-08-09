'use client';
import Link from 'next/link';

import { useEffect, useState } from 'react';
import Join from '../login-join/Join';
import Login from '../login-join/Login';
import UserMenu from '../user-menu/UserMenu';
/** image */
import { instance } from '@/api/instance';

function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await instance.get('/api/user', {
          withCredentials: true,
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, []);
  return (
    <header className='z-10 sticky top-0 flex h-16 items-center gap-4 px-4 md:px-6 flex justify-between'>
      <nav className='w-full h-16 flex-row gap-6 text-lg font-medium flex flex-row items-center gap-5 text-sm lg:gap-10'>
        <Link href='/' className='flex h-16 items-center gap-2 text-lg font-semibold md:text-base '>
          <div />
          <span className='sr-only'>PicT</span>
        </Link>

        {/* <Link href='/1' className='text-foreground transition-colors hover:text-muted'>
          메인1
        </Link>
        <Link href='/' className='text-foreground transition-colors hover:text-muted'>
          메인2
        </Link> */}

        {user ? (
          <UserMenu />
        ) : (
          <>
            <Login />
            <Join />
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
