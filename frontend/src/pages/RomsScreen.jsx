import React from "react";
import { useResponsive } from "../hooks/useMediaQuery";
import { useRomsCategories } from "../hooks/useApi";
import RomsCard from "../components/ui/RomsCard";
import { useNavigate } from "react-router-dom";

const RomsScreen = () => {
  const { isMobile, isDesktop } = useResponsive();
  const navigate = useNavigate();
  const { categories, loading, error } = useRomsCategories();

  const handleNavigateToGames = (category) => {
    // Use the existing slug from the category data instead of creating one
    const categorySlug = category.slug || category.name.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '');
    navigate(`/games/${categorySlug}`); 
  };
  return (
    <div>
      {/* Loading state */}
      {loading && (
        <div className="text-center p-4">
          <p>Loading ROM categories...</p>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="text-center p-4 text-red-500">
          <p>Failed to load ROM categories. Please try again later.</p>
        </div>
      )}

      {/* is Desktop */}
      {!loading && !error && isDesktop && (
        <div className="ml-60 mr-60">
          <h1 className="my-6 p-2 text-4xl font-bold">List of Available Roms</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
            {categories.map((category, index) => (
              <RomsCard
                key={category._id || index}
                onClick={() => handleNavigateToGames(category)}
                title={category.name}
                imageUrl={category.icon || "https://via.placeholder.com/300x200?text=ROM"}
              />
            ))}
          </div>
        </div>
      )}

      {/* is Mobile */}
      {!loading && !error && isMobile && (
        <div>
          <h1 className="my-4 p-2 text-2xl font-bold">List of Available Roms</h1>
          <div className="grid grid-cols-2 gap-1">
            {categories.map((category, index) => (
              <RomsCard
                key={category._id || index}
                onClick={() => handleNavigateToGames(category)}
                title={category.name}
                imageUrl={category.icon || "https://via.placeholder.com/300x200?text=ROM"}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RomsScreen;
