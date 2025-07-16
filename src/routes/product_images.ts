import { Router } from "express";
import verifyToken from "../middleware/verifyToken";
import {
  getProductImages,
  getProductImage,
  addProductImage,
  updateProductImage,
  deleteProductImage,
} from "../controllers/product_images";

const router = Router();

router.get(
  "/:productId",
  [verifyToken(["admin", "vendedor", "cliente"])],
  getProductImages
);
router.get(
  "/image/:id",
  [verifyToken(["admin", "vendedor", "cliente"])],
  getProductImage
);
router.post(
  "/:productId",
  [verifyToken(["admin", "vendedor"])],
  addProductImage
);
router.patch(
  "/image/:id",
  [verifyToken(["admin", "vendedor"])],
  (req: any, res: any) => {
    updateProductImage(req, res);
  }
);
router.delete(
  "/image/:id",
  [verifyToken(["admin", "vendedor"])],
  (req: any, res: any) => {
    deleteProductImage(req, res);
  }
);

export default router;
