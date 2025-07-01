import { useMediaQuery } from 'react-responsive'

/**
 * Custom hook for responsive design breakpoints
 * @returns {Object} Object containing boolean values for different screen sizes
 */
export const useResponsive = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 })
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 })
  const isDesktop = useMediaQuery({ minWidth: 1024 })
  const isSmallMobile = useMediaQuery({ maxWidth: 480 }) 

  return {
    isMobile,
    isTablet,
    isDesktop,
    isSmallMobile,
    // Combined breakpoints for convenience
    isMobileOrTablet: isMobile || isTablet,
    isTabletOrDesktop: isTablet || isDesktop
  }
}

/**
 * Custom hook for specific breakpoint checks
 * @param {number} maxWidth - Maximum width for mobile
 * @param {number} minWidth - Minimum width for desktop
 * @returns {Object} Object with isMobile and isDesktop booleans
 */
export const useBreakpoint = (maxWidth = 767, minWidth = 768) => {
  const isMobile = useMediaQuery({ maxWidth })
  const isDesktop = useMediaQuery({ minWidth })

  return { isMobile, isDesktop }
}
