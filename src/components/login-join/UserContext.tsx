'use client';

import React, { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

interface User {
  displayName: string;
  email: string;
}

interface UserContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;


