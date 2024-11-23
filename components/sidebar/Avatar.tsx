"use client";

import Image from "next/image";
import useActiveList from "@/hooks/utils/useActiveList";

type SafeUser = {
  id: string;
  name?: string | null;
  email?: string | null;
  emailVerified?: Date | null;
  image?: string | null;
  password?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

interface AvatarProps {
  user?: SafeUser | null;
  size?: 'small' | 'medium' | 'large';
}

const Avatar: React.FC<AvatarProps> = ({ user, size = 'medium' }) => {
  const { members } = useActiveList();
  const isActive = members.indexOf(user?.email ?? '') !== -1;

  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-9 h-9 md:w-11 md:h-11',
    large: 'w-11 h-11 md:w-12 md:h-12'
  };

  const statusSizeClasses = {
    small: 'w-2 h-2',
    medium: 'w-2 h-2 md:w-3 md:h-3',
    large: 'w-3 h-3 md:w-3.5 md:h-3.5'
  };

  const getImageSource = () => {
    if (user?.image) {
      return user.image;
    }
    return '/images/profile-pic.jpg';
  };

  return (
    <div className="relative">
      <div className={`relative inline-block rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <Image
          src={getImageSource()}
          alt={user?.name || 'Avatar'}
          fill
          sizes="(max-width: 768px) 96px, 128px"
          quality={80}
          loading="eager"
          className="object-cover transition-opacity duration-200"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/images/profile-pic.jpg';
          }}
        />
      </div>
      <span 
        className={`
          absolute 
          block 
          rounded-full 
          ${isActive ? 'bg-green-500' : 'bg-red-500'}
          ring-2 
          ring-white 
          top-0 
          right-0
          ${statusSizeClasses[size]}
          ${!isActive && 'flex items-center justify-center'}
        `}
      >
        {!isActive && (
          <div 
            className="
              w-[70%] 
              h-[3px] 
              bg-black/90 
              rounded-full 
              absolute 
              top-1/2 
              left-1/2 
              -translate-x-1/2 
              -translate-y-1/2
            "
          />
        )}
      </span>
    </div>
  );
};

export default Avatar;