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
    const { page = 1, limit = 20 } = req.query;
    
    // Validate slug parameter
    if (!slug) {
        throw new ApiError(400, "Category slug is required");
    }
    
    // Convert page and limit to numbers and validate
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    
    if (pageNum < 1) {
        throw new ApiError(400, "Page number must be greater than 0");
    }
    
    if (limitNum < 1 || limitNum > 500) {
        throw new ApiError(400, "Limit must be between 1 and 500");
    }
    
    // Map slug to gamelist key 
    // and game category increase then update this map 
    const categoryMap = {
        "nintendo-switch-1": "Nintendo Switch Game List",
        "windows": "Windows Game List",
        "ps3": "PS3 Game List",
        "ps4": "PS4 Game List",
        "ps2": "PS2 Game List",
        "psp": "PSP Game List",
        "ps-vita": "PS Vita Game List",
        "nintendo-3ds": "Nintendo 3DS Game List",
        "nintendo-wii": "Nintendo Wii Game List",
        "xbox": "Xbox Game List",
    };
    
    const gameListKey = categoryMap[slug];
    if (!gameListKey) {
        throw new ApiError(404, `Invalid category slug: ${slug}. Available slugs: ${Object.keys(categoryMap).join(', ')}`);
    }

    const gamelistDoc = await Gamelist.findOne({});
    if (!gamelistDoc) {
        throw new ApiError(500, "Gamelist database not found");
    }
    
    if (!gamelistDoc[gameListKey]) {
        throw new ApiError(404, `No games found for category: ${gameListKey}`);
    }

    const allGames = gamelistDoc[gameListKey];
    const totalGames = allGames.length;
    
    // Calculate pagination
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;
    const paginatedGames = allGames.slice(startIndex, endIndex);
    
    // Calculate pagination metadata
    const totalPages = Math.ceil(totalGames / limitNum);
    const hasMore = pageNum < totalPages;
    const hasPrevious = pageNum > 1;

    res.status(200).json(
        new ApiResponse(200, `Games fetched successfully for ${slug}`, {
            games: paginatedGames,
            pagination: {
                currentPage: pageNum,
                totalPages,
                totalGames,
                hasMore,
                hasPrevious,
                pageSize: limitNum,
                count: paginatedGames.length
            }
        })
    );
});

const getGameById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    
    if (!id) {
        throw new ApiError(400, "Game ID is required");
    }

    const gamelistDoc = await Gamelist.findOne({});
    if (!gamelistDoc) {
        throw new ApiError(500, "Gamelist database not found");
    }

    // Search through all game categories to find the game by ID
    let foundGame = null;
    let foundCategory = null;

    const categoryMap = {
        "nintendo-switch-1": "Nintendo Switch Game List",
        "windows": "Windows Game List",
        "ps3": "PS3 Game List",
        "ps4": "PS4 Game List",
        "ps2": "PS2 Game List",
        "psp": "PSP Game List",
        "ps-vita": "PS Vita Game List",
        "nintendo-3ds": "Nintendo 3DS Game List",
        "nintendo-wii": "Nintendo Wii Game List",
        "xbox": "Xbox Game List",
    };

    for (const [slug, categoryKey] of Object.entries(categoryMap)) {
        if (gamelistDoc[categoryKey]) {
            const game = gamelistDoc[categoryKey].find(game => 
                game._id?.toString() === id || 
                game.id?.toString() === id || 
                game.game_id?.toString() === id
            );
            if (game) {
                foundGame = game;
                foundCategory = slug;
                break;
            }
        }
    }

    if (!foundGame) {
        throw new ApiError(404, `Game with ID ${id} not found`);
    }

    res.status(200).json(
        new ApiResponse(200, "Game fetched successfully", {
            ...foundGame,
            category: foundCategory
        })
    );
});



export { getAllRomsCategories, getGamesByCategorySlug, getGameById };