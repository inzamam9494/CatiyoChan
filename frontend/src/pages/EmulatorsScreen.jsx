import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useResponsive } from "../hooks/useMediaQuery";
import { useEmulatorsBySlug, useEmulatorsList } from "../hooks/useApi.js";
import GameCard from "../components/ui/GameCard";

const EmulatorsScreen = () => {
  const { isMobile, isDesktop } = useResponsive();
  const navigate = useNavigate();
  const { slug } = useParams();
  const { emulators, loading, error } = useEmulatorsBySlug(slug);
  const location = useLocation();
  const emulatorName = location.state?.emulatorName || "Emulator";

  return (
    <div>
      {/* Loading state */}
      {loading && (
        <div className="text-center p-4">
          <p>Loading emulators...</p>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="text-center p-4 text-red-500">
          <p>Failed to load emulators. Please try again later.</p>
        </div>
      )}
      {/* is Desktop */}
      {!loading && !error && isDesktop && (
        <div className="ml-60 mr-60">
          <h1 className="my-6 p-2 text-4xl font-bold">
            List of <span>{emulatorName}</span> Emulators
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-4">
            {emulators.map((emulators, index) => (
              <GameCard
                key={emulators._id || index}
                title={emulators.name}
                imgUrl={
                  emulators.icon ||
                  "https://via.placeholder.com/250x350?text=Game"
                }
                categorySlug="Emulator"
                onClick={() =>
                  navigate(`/emulators/${slug}/${emulators._id}`, {
                    state: {
                      emulatorData: emulators,
                      emulatorName: emulators.name,
                    },
                  })
                }
              />
            ))}
          </div>
        </div>
      )}

      {/* is Mobile */}
      {!loading && !error && isMobile && (
        <div className="p-4">
          <h1 className="my-4 p-2 text-2xl font-bold">
            List of <span>{emulatorName}</span> Emulators
          </h1>
          <div className="grid grid-cols-2 gap-1">
            {emulators.map((emulators, index) => (
              <GameCard
                key={emulators._id || index}
                title={emulators.name}
                imgUrl={
                  emulators.icon ||
                  "https://via.placeholder.com/250x350?text=Game"
                }
                size={emulators.size || "Unknown"}
                onClick={() =>
                  navigate(`/emulators/${slug}/${emulators._id}`, {
                    state: {
                      emulatorName: emulators.name,
                      emulatorData: emulators,
                    },
                  })
                }
                categorySlug="Emulator"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmulatorsScreen;
