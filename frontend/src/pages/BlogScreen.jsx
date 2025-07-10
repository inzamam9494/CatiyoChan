import React from 'react'
import { useResponsive } from '../hooks'

const BlogScreen = () => {
    const { isMobile, isDesktop } = useResponsive()
  return (
    <div>
      {/* isDesktop */}
      {isDesktop && (
        <div className='flex flex-col items-center justify-center h-screen space-y-4'>
            <h1 className='font-bold text-4xl text-white'>COMING SOON</h1>
        </div>
      )}
      {/* isMobile */}
      {isMobile && (
        <div className='flex flex-col items-center justify-center h-screen space-y-4'>
            <h1 className='font-bold text-2xl'>COMING SOON</h1>
        </div>
      )}
    </div>
  )
}

export default BlogScreen
