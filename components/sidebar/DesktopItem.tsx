"use client";

import clsx from "clsx";
import Link from "next/link";
import { IconType } from "react-icons";

interface DesktopItemProps {
    label: string;
    icon: IconType;
    href: string;
    onClick?: () => void;
    active?: boolean;
    notificationCount?: number;
}

const DesktopItem: React.FC<DesktopItemProps> = ({
    // label,
    icon: Icon,
    href,
    onClick,
    active,
    notificationCount = 0,
}) => {
    const handleClick = () => {
        if (onClick) {
            return onClick();
        }
    };

    return (
        <li onClick={handleClick} className="relative">
            <Link
                href={href}
                className={clsx(
                    `
                    group
                    flex
                    gap-x-3
                    rounded-md
                    p-3
                    text-sm
                    leading-6
                    font-semibold
                    text-gray-500
                    hover:text-black
                    hover:bg-gray-100
                    dark:hover:bg-gray-800
                `,
                    active &&
                        "bg-gray-100 dark:bg-gray-800 text-black dark:text-gray-100",
                )}
            >
                <div className="relative">
                    <Icon className="h-6 w-6 shrink-0" />
                    {notificationCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {notificationCount > 9 ? "9+" : notificationCount}
                        </span>
                    )}
                </div>
            </Link>
        </li>
    );
};

export default DesktopItem;
