import React from "react";
import { useResponsive } from "../hooks/useMediaQuery.js";
import { useNavigate } from "react-router-dom";
import { useEmulatorsList } from "../hooks/useApi.js";
import RomsCard from "../components/ui/RomsCard.jsx";

const EmulatorsCategoryScreen = () => {
  const { isMobile, isDesktop } = useResponsive();
  const navigate = useNavigate();
  const { emulatorsList, loading, error } = useEmulatorsList();

  return (
    <div>
      {/* Loading state */}
      {loading && (
        <div className="text-center p-4">
          <p>Loading emulators Lists...</p>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="text-center p-4 text-red-500">
          <p>Failed to load emulators list. Please try again later.</p>
        </div>
      )}

      {/* is Desktop */}
      {!loading && !error && isDesktop && (
        <div className="ml-60 mr-60">
          <h1 className="my-6 p-2 text-4xl font-bold">
            List of Available Emulators
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
            {emulatorsList.map((emulators, index) => (
              <RomsCard
                key={emulators._id || index}
                title={emulators.name}
                imageUrl={emulators.icon}
                onClick={() => navigate(`/emulators/${emulators.slug}`, {
                  state: { emulatorName: emulators.name },
                })}
              />
            ))}
          </div>
        </div>
      )}

      {/* is Mobile */}
      {!loading && !error && isMobile && (
        <div className="p-4">
          <h1 className="my-4 p-2 text-2xl font-bold">
            List of Available Emulators
          </h1>

          <div className="grid grid-cols-2 gap-1">
            {emulatorsList.map((emulators, index) => (
              <RomsCard
                key={emulators._id || index}
                title={emulators.name}
                imageUrl={emulators.icon}
                onClick={() => navigate(`/emulators/${emulators.slug}` , {
                  state: { emulatorName: emulators.name },
                })}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmulatorsCategoryScreen;
