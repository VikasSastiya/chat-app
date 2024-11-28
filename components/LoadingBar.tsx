'use client'

import { useEffect } from 'react'
import NProgress from 'nprogress'
import { usePathname } from 'next/navigation'

export default function LoadingBar() {
  const pathname = usePathname()

  useEffect(() => {
    NProgress.configure({ 
      minimum: 0.3,
      easing: 'ease',
      speed: 400,
      trickleSpeed: 80,
      showSpinner: false,
    })
  }, [])

  useEffect(() => {
    // Start immediately on pathname change
    NProgress.start()

    // Force a quick completion
    requestAnimationFrame(() => {
      NProgress.done()
    })

    return () => {
      NProgress.remove()
    }
  }, [pathname])

  // Handle conversation clicks specifically
  useEffect(() => {
    const handleConversationClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const conversationElement = target.closest('[data-conversation]')
      if (conversationElement) {
        NProgress.start()
      }
    }

    document.addEventListener('click', handleConversationClick)
    return () => document.removeEventListener('click', handleConversationClick)
  }, [])

  return null
}