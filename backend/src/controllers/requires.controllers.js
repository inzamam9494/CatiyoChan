import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { RequiresRomEmu } from "../models/requires.model.js";

const requires = asyncHandler(async (req, res) => {
  const { name, email, requiresRomEmu } = req.body;

  // Validate required fields
  if (!name || !email || !requiresRomEmu) {
    throw new ApiError(400, "Name, email, and requirements are required");
  }

  // Check if user with same email already submitted a request
  const existingRequest = await RequiresRomEmu.findOne({ 
    $or: [
      { email: email.toLowerCase() },
      { name: name.trim(), email: email.toLowerCase() }
    ]
  });
  
  if (existingRequest) {
    if (existingRequest.email === email.toLowerCase()) {
      throw new ApiError(409, "A request with this email already exists. Please use a different email or contact support.");
    } else {
      throw new ApiError(409, "A request with this name and email combination already exists.");
    }
  }

  // Save to database
  const newRequires = await RequiresRomEmu.create({
    name,
    email,
    requiresRomEmu,
  });

  // Return success response
  return res
    .status(201)
    .json(
      new ApiResponse(201, newRequires, "Requirements submitted successfully")
    );
});

export { requires };
