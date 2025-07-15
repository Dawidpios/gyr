'use client'

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
type SessionType = {
  children: ReactNode,
}

export default function Session({children}: SessionType) {
  return ( 
    <SessionProvider>
      {children}
    </SessionProvider>
   );
}
 