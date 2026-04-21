import express from "express";
import {
	getContentById,
	getContentList,
	getFeaturedContent,
	getTop10ByType,
	getTrendingContent,
	searchContent
} from "../controllers/contentController.js";

const router = express.Router();

router.get("/featured", getFeaturedContent);
router.get("/trending", getTrendingContent);
router.get("/top10", getTop10ByType);
router.get("/search", searchContent);
router.get("/", getContentList);
router.get("/:id", getContentById);

export default router;
