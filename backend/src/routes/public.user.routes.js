import { Router } from "express";
import { getAllRomsCategories, getGamesByCategorySlug, getGameById } from "../controllers/roms.controllers.js";
import { getAllEmulatorsCategories, getEmulatorsByCategorySlug } from "../controllers/emulators.controllers.js";
import { 
  createComment, 
  getGameComments, 
  getEmulatorComments, 
  getAllComments, 
  deleteComment, 
  updateComment 
} from "../controllers/comment.controllers.js";
import {
  reportIssue,
  getAllReports,
  getReportById,
  deleteReport
} from "../controllers/help.center.controllers.js";

const router = Router();

router.route("/roms-categories").get(getAllRomsCategories);

router.route("/roms-categories/:slug").get(getGamesByCategorySlug);

router.route("/games/:id").get(getGameById);

router.route("/emulators-categories").get(getAllEmulatorsCategories);

router.route("/emulators-categories/:slug").get(getEmulatorsByCategorySlug);

// Comment routes
router.route("/comments").post(createComment).get(getAllComments);
router.route("/comments/game/:gameId").get(getGameComments);
router.route("/comments/emulator/:emulatorId").get(getEmulatorComments);
router.route("/comments/:commentId").delete(deleteComment).put(updateComment);

// Help Center routes
router.route("/help/report").post(reportIssue);
router.route("/help/reports").get(getAllReports);
router.route("/help/reports/:id").get(getReportById).delete(deleteReport);

export default router;