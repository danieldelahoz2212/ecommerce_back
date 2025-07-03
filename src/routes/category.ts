import { Router } from "express";
import verifyToken from "../middleware/verifyToken";
import { getCategorys, createCategory } from "../controllers/category";

const router = Router();

router.get("/", getCategorys);
router.post("/", verifyToken(["admin", "vendedor"]), createCategory);

export default router;
