import React from 'react'
import { useResponsive } from '../hooks';
import { useLocation, useParams } from 'react-router-dom';
import { useEmulatorDetails } from '../hooks/useApi';

const EmulatorDetailScreen = () => {
  const { isMobile, isDesktop } = useResponsive();
  const {categorySlug, emulatorId} = useParams();
  const location = useLocation();
  const {emulatorDetails, loading, error} = useEmulatorDetails(categorySlug, emulatorId);

  const emulatorData = location.state?.emulatorData || {};
  return (
    <div>
      {/* Loading state */}
      {loading && (
        <div className="text-center p-4">
          <p>Loading emulator details...</p>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="text-center p-4 text-red-500">
          <p>Failed to load emulator details. Please try again later.</p>
        </div>
      )}

      {/* isDesktop */}
      {!loading && !error && isDesktop && (
        <div className="ml-60 mr-60">
          <h1 className="my-6 p-2 text-4xl font-bold">{emulatorData.name}</h1>
          <p>{emulatorDetails.publisher}</p>
        </div>
      )}

      {/* isMobile */}
      {isMobile && (
        <div className="ml-4 mr-4">
          <h1 className="my-4 p-2 text-2xl font-bold">Emulator Detail Screen</h1>
          <p>This is the mobile version of the Emulator Detail Screen.</p>
        </div>
      )}
    </div>
  )
}

export default EmulatorDetailScreen
