import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

const requires = asyncHandler(async (req, res) => {
  const { name, email, requirements } = req.body;

  // Validate required fields
  if (!name || !email || !requirements) {
    throw new ApiError(400, "Name, email, and requirements are required");
  }
  // Create a new requires entry
  const newRequires = {
    name,
    email,
    requirements,
  };
  // Here you would typically save the newRequires to a database
  // For demonstration, we will just return it in the response
  return res
    .status(201)
    .json(
      new ApiResponse(201, newRequires, "Requirements submitted successfully")
    );
});

export { requires };
