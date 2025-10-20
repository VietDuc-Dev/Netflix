import express from "express";
import personController from "../controllers/person.controller.js";

const router = express.Router({ mergeParams: false });

//[GET] /api/v1/person/:personId
router.get("/:personId/detail", personController.personDetail);

//[GET] /api/v1/person/:personId/medias
router.get("/:personId/medias", personController.personMedias);

export default router;
