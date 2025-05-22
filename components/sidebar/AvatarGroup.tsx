"use client";

import React from "react";
import { FaUsers } from "react-icons/fa";

const AvatarGroup = () => {
    return (
        <div className="relative h-12 w-12 rounded-full overflow-hidden">
            <div className="flex items-center justify-center h-full w-full bg-gray-300 rounded-full">
                <div className="flex items-center justify-center h-10 w-10">
                    <FaUsers className="text-white text-2xl" />
                </div>
            </div>
        </div>
    );
};

export default AvatarGroup;
