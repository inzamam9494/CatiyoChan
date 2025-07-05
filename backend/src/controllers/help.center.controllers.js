import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { HelpCenter } from "../models/help.center.model.js";

const reportIssue = asyncHandler(async (req, res) => {
    const { name, url, email, issue, feedback } = req.body;
    
    if (!url || !email || !issue) {
        throw new ApiError(400, "URL, email, and issue are required");
    }
    
    // Create new help center report
    const helpReport = await HelpCenter.create({
        name: name || "Anonymous",
        url,
        email,
        issue,
        feedback: feedback || ""
    });
    
    return res.status(201).json(
        new ApiResponse(201, helpReport, "Issue report submitted successfully")
    );
});

// Get all help center reports (for admin use)
const getAllReports = asyncHandler(async (req, res) => {
    const reports = await HelpCenter.find({}).sort({ createdAt: -1 });
    
    return res.status(200).json(
        new ApiResponse(200, reports, "Help center reports fetched successfully")
    );
});

// Get a specific report by ID
const getReportById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    
    const report = await HelpCenter.findById(id);
    
    if (!report) {
        throw new ApiError(404, "Report not found");
    }
    
    return res.status(200).json(
        new ApiResponse(200, report, "Report fetched successfully")
    );
});

// Delete a report by ID (for admin use)
const deleteReport = asyncHandler(async (req, res) => {
    const { id } = req.params;
    
    const report = await HelpCenter.findByIdAndDelete(id);
    
    if (!report) {
        throw new ApiError(404, "Report not found");
    }
    
    return res.status(200).json(
        new ApiResponse(200, {}, "Report deleted successfully")
    );
});

export {
    reportIssue,
    getAllReports,
    getReportById,
    deleteReport
};