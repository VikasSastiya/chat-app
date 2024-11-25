'use client'

import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md"

export default function ThemeSwitch() {
    const [mounted, setMounted] = useState(false)
    const { setTheme, resolvedTheme } = useTheme()

    useEffect(() => setMounted(true), [])

    if (!mounted) return null

    return (
        <div 
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            className="cursor-pointer hover:opacity-75 transition"
        >
            <div className="p-2 bg-gray-100 dark:bg-gray-600 rounded-full flex items-center justify-center">
                {resolvedTheme === 'dark' ? (
                    <MdOutlineLightMode 
                        size={18} 
                        className="text-gray-600 dark:text-gray-300"
                    />
                ) : (
                    <MdOutlineDarkMode 
                        size={18} 
                        className="text-gray-600 dark:text-gray-300"
                    />
                )}
            </div>
        </div>
    )
}