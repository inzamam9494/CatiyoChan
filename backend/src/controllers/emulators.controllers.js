import { EmulatorsCategory } from "../models/emulators.category.model.js";
import { EmulatorsList } from "../models/emulatorslist.model.js";

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const getAllEmulatorsCategories = asyncHandler(async (req, res, next) => {
  const emulatorsCategories = await EmulatorsCategory.find({});
  if (!emulatorsCategories || emulatorsCategories.length === 0) {
    throw new ApiError(404, "No emulators categories found");
  }
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Emulators categories fetched successfully",
        emulatorsCategories
      )
    );
});

const getEmulatorsByCategorySlug = asyncHandler(async (req, res, next) => {
  const { slug } = req.params;
  // Map slug to emulators category key
  // and emulator category increase then update this map
  const categoryMap = {
    "nintendo-switch": "Nintendo Switch Virtual Console",
    "windows": "Windows Emulators",
    "ps3": "PlayStation 3 Emulators",
    "ps4": "PlayStation 4 Emulators",
    "ps2": "PlayStation 2 Emulators",
    "ps-vita": "PlayStation Vita Emulators",
    "psp": "PlayStation Portable Emulators",
    "nintendo-3ds": "Nintendo 3DS Emulators",
    "nintendo-wii": "Nintendo Wii Emulators",
    "nintendo-wii-u": "Nintendo Wii U Emulators",
    "xbox": "Xbox Emulators",
  };
  const emulatorsListKey = categoryMap[slug];
  if (!emulatorsListKey) {
    throw new ApiError(404, "Invalid category slug");
  }
  const emulatorsListDoc = await EmulatorsList.findOne({});
  if (!emulatorsListDoc || !emulatorsListDoc[emulatorsListKey]) {
    throw new ApiError(404, "No emulators found for this category");
  }
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Emulators fetched successfully",
        emulatorsListDoc[emulatorsListKey]
      )
    );
}
);

export { getAllEmulatorsCategories, getEmulatorsByCategorySlug };
