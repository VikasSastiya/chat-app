'use client'

import { useEffect } from 'react'
import NProgress from 'nprogress'
import { usePathname, useSearchParams } from 'next/navigation'

export default function LoadingBar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    NProgress.configure({ 
      minimum: 0.2,
      easing: 'ease',
      speed: 500,
      trickleSpeed: 100,
      showSpinner: false,
    })

    // Start immediately when route changes
    NProgress.start()

    // Create a small delay before completing to ensure smooth animation
    const timer = setTimeout(() => {
      NProgress.done()
    }, 100)

    return () => {
      clearTimeout(timer)
      NProgress.remove()
    }
  }, [pathname, searchParams])

  // Add event listeners for navigation start
  useEffect(() => {
    const handleStart = () => {
      NProgress.start()
    }

    // const handleStop = () => {
    //   NProgress.done()
    // }

    // Listen for client-side navigation events
    window.addEventListener('beforeunload', handleStart)
    window.addEventListener('popstate', handleStart)
    
    // Listen for link clicks
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'A' || target.closest('a')) {
        handleStart()
      }
    })

    return () => {
      window.removeEventListener('beforeunload', handleStart)
      window.removeEventListener('popstate', handleStart)
    }
  }, [])

  return null
}
