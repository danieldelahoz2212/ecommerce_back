import { Router } from "express";
import verifyToken from "../middleware/verifyToken";
import { getStateOrders, createStateOrder } from "../controllers/stateorder";

const router = Router();

router.get("/", getStateOrders);
router.post("/", [verifyToken(["admin", "vendedor"])], createStateOrder);

export default router;
