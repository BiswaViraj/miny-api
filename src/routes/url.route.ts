import express from "express";
import { createUrl } from "../controllers/url.controller";

const router = express.Router();

router.post("/create", createUrl);

export default router;
