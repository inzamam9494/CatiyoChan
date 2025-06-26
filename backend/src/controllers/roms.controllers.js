import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { RomsCategory } from "../models/roms.category.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Gamelist } from "../models/gamelist.model.js";


const getAllRomsCategories = asyncHandler(async (req, res, next) => {
    const romsCategories = await RomsCategory.find({});
    if (!romsCategories || romsCategories.length === 0) {
        throw new ApiError(404, "No roms categories found");
    }
    res.status(200).json(
        new ApiResponse(200, "Roms categories fetched successfully", romsCategories)
    );
});

const getGamesByCategorySlug = asyncHandler(async (req, res, next) => {
    const { slug } = req.params;
    // Map slug to gamelist key 
    // and game category increase then update this map 
     const categoryMap = {
        "nintendo-switch-1": "Nintendo Switch Game List",
        "windows": "Windows Game List",
        "ps3": "PS3 Game List",
        "ps4": "PS4 Game List",
        "ps2": "PS2 Game List"
    };
    const gameListKey = categoryMap[slug];
    if (!gameListKey) {
        throw new ApiError(404, "Invalid category slug");
    }

    const gamelistDoc = await Gamelist.findOne({});
    if (!gamelistDoc || !gamelistDoc[gameListKey]) {
        throw new ApiError(404, "No games found for this category");
    }

    res.status(200).json(
        new ApiResponse(200, "Games fetched successfully", gamelistDoc[gameListKey])
    );
}
)



export { getAllRomsCategories, getGamesByCategorySlug };