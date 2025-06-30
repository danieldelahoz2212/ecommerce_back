import { Router } from "express";
import verifyToken from "../middleware/verifyToken";
import {
  getProducts,
  getProduct,
  postProduct,
  patchProduct,
  deleteProduct,
} from "../controllers/products";

const router = Router();
router.get("/", [verifyToken(["admin", "vendedor", "cliente"])], getProducts);
router.get("/:id", [verifyToken(["admin", "vendedor", "cliente"])], getProduct);
router.post("/", [verifyToken(["admin", "vendedor"])], postProduct);
router.patch("/:id", [verifyToken(["admin", "vendedor"])], patchProduct);
router.delete(
  "/:id",
  [verifyToken(["admin", "vendedor", "cliente"])],
  deleteProduct
);

export default router;
