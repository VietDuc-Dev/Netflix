import express from "express";
import mediaController from "../controllers/media.controller.js";

const router = express.Router({ mergeParams: true });

router.get("/search", mediaController.search);

// [GET] /api/v1/:mediaType/genres
router.get("/genres", mediaController.getGenres);

// [GET] /api/v1/:mediaType/detail/:mediaId
router.get("/detail/:mediaId", mediaController.getDetail);

// [GET] /api/v1/:mediaType/:mediaCategory/:mediaType?page=
router.get("/:mediaCategory", mediaController.getList);

export default router;
