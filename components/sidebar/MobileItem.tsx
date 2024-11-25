'use client';

import Link from "next/link";
import clsx from "clsx";
import { Badge } from "@/components/ui/badge";
import { IconType } from "react-icons";

interface MobileItemProps {
    label?: string;
    icon: IconType;
    href: string;
    onClick?: () => void;
    active?: boolean;
    notificationCount?: number;
}

const MobileItem: React.FC<MobileItemProps> = ({
    href,
    icon: Icon,
    active,
    onClick,
    notificationCount = 0
}) => {
    const handleClick = () => {
        if (onClick) {
            return onClick();
        }
    };

    return (
        <Link 
            href={href}
            onClick={handleClick}
            className={clsx(`
                group 
                flex 
                gap-x-3 
                text-sm 
                leading-6 
                font-semibold 
                w-full 
                justify-center 
                p-4 
                text-gray-500 
                hover:text-black 
                hover:bg-gray-100
                dark:hover:bg-gray-800
            `,
                active && "bg-gray-100 dark:bg-gray-800 text-black dark:text-gray-100",
            )}
        >
            <div className="relative">
                <Icon className="h-6 w-6" />
                {notificationCount > 0 && (
                    <Badge 
                        className="absolute -top-2 -right-2 h-4 w-4 rounded-full p-0 flex items-center justify-center bg-purple-500 text-[10px]"
                    >
                        {notificationCount}
                    </Badge>
                )}
            </div>
        </Link>
    );
}

export default MobileItem;