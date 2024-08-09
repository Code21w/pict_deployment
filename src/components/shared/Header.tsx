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
    <header className='z-10 sticky top-0 flex h-16 items-center gap-4 px-4 md:px-6'>
      <nav className='w-full h-16 flex justify-between items-center text-lg font-medium'>
        <div className='flex flex-row items-center gap-5 text-sm lg:gap-10'>
          <Link
            href='/'
            className='flex h-16 items-center gap-2 text-xl font-semibold md:text-base '
          >
            <span className='text-xl ml-3'>Pic T</span>
          </Link>
        </div>

        <div className='flex items-center'>
          {user ? (
            <UserMenu />
          ) : (
            <>
              <div className='px-6 py-2'>
                <Login />
              </div>
              <div className='px-6 py-2'>
                <Join />
              </div>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
export default Header;
