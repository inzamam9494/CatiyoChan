import { Router } from "express";
import { getAllRomsCategories } from "../controllers/roms.controllers.js";

const router = Router();

router.route("/roms-categories").get(getAllRomsCategories);

export default router;