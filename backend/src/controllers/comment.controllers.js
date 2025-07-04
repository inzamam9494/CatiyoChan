
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { GameComment } from "../models/comment.model.js";

// Create a new comment
const createComment = asyncHandler(async (req, res) => {
  const { content, name, email, game, emulator, commentType } = req.body;

  // Validate required fields
  if (!content || !name || !email || !commentType) {
    throw new ApiError(400, "Content, name, email, and commentType are required");
  }

  // Validate commentType
  if (!['game', 'emulator'].includes(commentType)) {
    throw new ApiError(400, "commentType must be either 'game' or 'emulator'");
  }

  // Validate reference based on commentType
  if (commentType === 'game' && !game) {
    throw new ApiError(400, "Game ID is required for game comments");
  }
  if (commentType === 'emulator' && !emulator) {
    throw new ApiError(400, "Emulator ID is required for emulator comments");
  }

  // Create comment
  const comment = await GameComment.create({
    content,
    name,
    email,
    game: commentType === 'game' ? game : undefined,
    emulator: commentType === 'emulator' ? emulator : undefined,
    commentType
  });

  return res.status(201).json(
    new ApiResponse(201, comment, "Comment created successfully")
  );
});

// Get comments for a specific game
const getGameComments = asyncHandler(async (req, res) => {
  const { gameId } = req.params;

  if (!gameId) {
    throw new ApiError(400, "Game ID is required");
  }

  const comments = await GameComment.find({
    commentType: 'game',
    game: gameId
  })
    .populate('game', 'game_name')
    .sort({ createdAt: -1 }); // Latest first

  return res.status(200).json(
    new ApiResponse(200, comments, "Game comments fetched successfully")
  );
});

// Get comments for a specific emulator
const getEmulatorComments = asyncHandler(async (req, res) => {
  const { emulatorId } = req.params;

  if (!emulatorId) {
    throw new ApiError(400, "Emulator ID is required");
  }

  const comments = await GameComment.find({
    commentType: 'emulator',
    emulator: emulatorId
  })
    .populate('emulator', 'name')
    .sort({ createdAt: -1 }); // Latest first

  return res.status(200).json(
    new ApiResponse(200, comments, "Emulator comments fetched successfully")
  );
});

// Get all comments (admin use)
const getAllComments = asyncHandler(async (req, res) => {
  const { page = 1, limit = 100, commentType } = req.query;

  const filter = {};
  if (commentType && ['game', 'emulator'].includes(commentType)) {
    filter.commentType = commentType;
  }

  const comments = await GameComment.find(filter)
    .populate('game', 'game_name')
    .populate('emulator', 'name')
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);

  const total = await GameComment.countDocuments(filter);

  return res.status(200).json(
    new ApiResponse(200, {
      comments,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    }, "Comments fetched successfully")
  );
});

// Delete a comment
const deleteComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;

  if (!commentId) {
    throw new ApiError(400, "Comment ID is required");
  }

  const comment = await GameComment.findByIdAndDelete(commentId);

  if (!comment) {
    throw new ApiError(404, "Comment not found");
  }

  return res.status(200).json(
    new ApiResponse(200, {}, "Comment deleted successfully")
  );
});

// Update a comment
const updateComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const { content } = req.body;

  if (!commentId) {
    throw new ApiError(400, "Comment ID is required");
  }

  if (!content) {
    throw new ApiError(400, "Content is required");
  }

  const comment = await GameComment.findByIdAndUpdate(
    commentId,
    { content },
    { new: true }
  );

  if (!comment) {
    throw new ApiError(404, "Comment not found");
  }

  return res.status(200).json(
    new ApiResponse(200, comment, "Comment updated successfully")
  );
});

export {
  createComment,
  getGameComments,
  getEmulatorComments,
  getAllComments,
  deleteComment,
  updateComment
};