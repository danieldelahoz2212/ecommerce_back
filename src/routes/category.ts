import { Router } from "express";
import verifyToken from "../middleware/verifyToken";
import { getCategorys } from "../controllers/category";

const router = Router();

router.get("/", getCategorys);

export default router;
