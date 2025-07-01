import { Router } from "express";
import { getAllRomsCategories, getGamesByCategorySlug, getGameById } from "../controllers/roms.controllers.js";
import { getAllEmulatorsCategories, getEmulatorsByCategorySlug } from "../controllers/emulators.controllers.js";

const router = Router();

router.route("/roms-categories").get(getAllRomsCategories);

router.route("/roms-categories/:slug").get(getGamesByCategorySlug);

router.route("/games/:id").get(getGameById);

router.route("/emulators-categories").get(getAllEmulatorsCategories);

router.route("/emulators-categories/:slug").get(getEmulatorsByCategorySlug);



export default router;