import express from "express";
import { importMovies, importSeries } from "../controllers/tmdbController.js";

const router = express.Router();

router.post("/import/movies", importMovies);
router.post("/import/series", importSeries);

export default router;