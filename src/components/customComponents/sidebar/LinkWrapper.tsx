'use client'

import { useSidebar } from "@components/components/ui/sidebar";

const LinkWrapper = ({children}: {children: React.ReactNode}) => {
  const { toggleSidebar } = useSidebar()
  return (
    <button className={`w-full flex items-center gap-2`} onClick={toggleSidebar}>{children}</button>
  );
}

export default LinkWrapper;