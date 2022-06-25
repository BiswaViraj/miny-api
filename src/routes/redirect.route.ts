import express from "express";

import { redirectURL } from "../controllers/redirect.controller";

const router = express.Router();

router.get("/:shortURL", redirectURL);

export default router;
