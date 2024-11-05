"use client";

import Image from "next/image";
import { User } from "@prisma/client";
// import useActiveList from "@/hooks/useActiveList";

interface AvatarProps {
  user?: User;
  size?: 'small' | 'medium' | 'large';
}

export default function Avatar({ user, size = 'medium' }: AvatarProps) {
//   const { members } = useActiveList();
//   const isActive = members.indexOf(user?.email!) !== -1;

  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-9 h-9 md:w-11 md:h-11',
    large: 'w-12 h-12 md:w-14 md:h-14'
  };

  // const statusSizeClasses = {
  //   small: 'w-2 h-2',
  //   medium: 'w-2 h-2 md:w-3 md:h-3',
  //   large: 'w-3 h-3 md:w-4 md:h-4'
  // };

  return (
    <div className="relative">
      <div className={`relative inline-block rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <Image
          src={user?.image || "/images/profile-pic.jpg"}
          alt={user?.name || 'Avatar'}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      {/* {isActive && (
        <span 
          className={`
            absolute 
            block 
            rounded-full 
            bg-green-500 
            ring-2 
            ring-white 
            top-0 
            right-0 
            ${statusSizeClasses[size]}
          `}
        />
      )} */}
    </div>
  );
}
