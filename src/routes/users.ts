import { Router } from "express";
import verifyToken from "../middleware/verifyToken";
import {
  getUsers,
  getUser,
  postUser,
  patchRol,
  patchUser,
  deleteUser,
  login,
} from "../controllers/users";

const router = Router();

router.get("/", [verifyToken(["admin"])], getUsers);
router.get("/:id", [verifyToken(["admin", "vendedor"])], getUser);
router.post("/", postUser);
router.patch("/rol", [verifyToken(["admin"])], patchRol);
router.patch("/:id", [verifyToken(["admin", "vendedor", "cliente"])], patchUser);
router.delete("/:id", [verifyToken(["admin", "vendedor"])], deleteUser);
router.post("/login", login);

export default router;
