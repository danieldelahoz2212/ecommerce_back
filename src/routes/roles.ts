import { Router } from "express";
import verifyToken from "../middleware/verifyToken";
import { getRol, getRoles } from "../controllers/roles";

const router = Router();

router.get("/:id", [verifyToken(["admin", "vendedor", "cliente"])], getRol);
router.get("/", [verifyToken(["admin", "vendedor"])], getRoles);

export default router;
