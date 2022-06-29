import express from "express";
import { createUrl, getUserUrl } from "../controllers/url.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/create", createUrl);
router.post("/create/private", authMiddleware, createUrl);
router.get("/", authMiddleware, getUserUrl);

export default router;
