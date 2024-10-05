import express from "express";
import { createCoupans, getCoupanss } from "../controller/Coupans.js";

const router = express.Router();

router.post("/create_Coupans", createCoupans);
router.get("/get_Coupanss", getCoupanss);

export default router;
