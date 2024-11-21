'use client';

import { usePathname } from 'next/navigation';
import { memo } from 'react';
import type { ReactNode } from 'react';

interface MobileNavigationWrapperProps {
  children: ReactNode;
}

function MobileNavigationWrapper({ children }: MobileNavigationWrapperProps) {
  const pathname = usePathname();

  const childrenArray = Array.isArray(children) ? children : [children];
  const isOverlayRoute = pathname.includes('/add') || pathname.includes('/requests');
  const isSpecificChat = pathname.includes('/conversations/') && pathname !== '/conversations';

  return (
    <>
      {/* Desktop View */}
      <div className="hidden md:flex h-full w-full">
        <div className={`${isOverlayRoute ? 'w-80' : ''} flex-none`}>
          {childrenArray[0]}
        </div>
        <div className={`flex-1 ${isOverlayRoute ? 'min-w-0' : ''}`}>
          {childrenArray[1]}
        </div>
      </div>

      {/* Mobile View */}
      <div className="block md:hidden h-full w-full">
        {isSpecificChat ? (
          // If the current route is a specific chat, render the chat content
          <div className="h-full">{childrenArray[1]}</div>
        ) : (
          // Otherwise, render the normal mobile layout
          <div className="flex h-full w-full">
            {isOverlayRoute ? (
              <div className="w-full h-full">{childrenArray[1]}</div>
            ) : (
              <>
                <div className={`flex-none ${isSpecificChat ? 'w-0' : ''}`}>
                  {childrenArray[0]}
                </div>
                <div className={`flex-1 ${isOverlayRoute ? 'min-w-0' : ''}`}>
                  {childrenArray[1]}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default memo(MobileNavigationWrapper);