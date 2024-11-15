"use client"

import React from 'react';
import Image from "next/image";

interface AvatarGroupProps {
    users: {
        name?: string | null;
        id: string;
        createdAt: Date;
        email?: string | null;
        emailVerified?: Date | null;
        image?: string | null;
        password?: string | null;
        updatedAt: Date;
    }[];
}

const AvatarGroup: React.FC<AvatarGroupProps> = ({ users = [] }) => {
    console.log('group users: ', users);
    const slicedUsers = users.slice(0, 3);

    const positionMap = {
        0: "top-0 left-[12px]",
        1: "bottom-0",
        2: "bottom-0 right-0"
    };

    return (
        <div className="relative h-11 w-11">
            {slicedUsers.map((user, index) => (
                <div 
                    key={user.id} 
                    className={`absolute inline-block rounded-full overflow-hidden h-[21px] w-[21px] ${positionMap[index as keyof typeof positionMap]}`}
                >
                    <Image 
                        fill 
                        src={user.image || '/images/profile-pic.jpg'} 
                        alt="Avatar" 
                    />
                </div>
            ))}
        </div>
    );
};

export default AvatarGroup;
