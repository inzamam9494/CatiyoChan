import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { RomsCategory } from "../models/roms.category.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const getAllRomsCategories = asyncHandler(async (req, res, next) => {
    const romsCategories = await RomsCategory.find({});
    if (!romsCategories || romsCategories.length === 0) {
        throw new ApiError(404, "No roms categories found");
    }
    res.status(200).json(
        new ApiResponse(200, "Roms categories fetched successfully", romsCategories)
    );
});

export { getAllRomsCategories }