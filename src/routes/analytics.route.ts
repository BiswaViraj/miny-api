import express from "express";
import { getAnalyticsByUser } from "../controllers/analytic.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/", authMiddleware, getAnalyticsByUser);

export default router;
