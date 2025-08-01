import { Router } from "express";
import verifyToken from "../middleware/verifyToken";
import { getOrders, getOrdersUser, postOrder } from "../controllers/orders";

const router = Router();

router.get("/", getOrders);
router.get(
  "/:id",
  [verifyToken(["admin", "vendedor", "cliente"])],
  getOrdersUser
);
router.post("/", [verifyToken(["admin", "vendedor", "cliente"])], postOrder);

export default router;
