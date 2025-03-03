import { Router } from "express";
import verifyToken from "../middleware/verifyToken";
import { getOrders, getOrder, postOrder } from "../controllers/orders";


const router = Router();

router.get("/",getOrders);
router.get("/:id",getOrder);
router.post("/", postOrder);

export default router;