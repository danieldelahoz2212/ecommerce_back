import { Router } from "express";
import verifyToken from "../middleware/verifyToken";
import {
  getUsers,
  getUser,
  postUser,
  patchUser,
  deleteUser,
  login,
} from "../controllers/users";

const router = Router();

router.get("/", getUsers);
router.get("/:id", [verifyToken(["admin", "vendedor", "cliente"])], getUser);
router.post("/", postUser);
router.patch("/:id", patchUser);
router.delete("/:id",[verifyToken(["admin", "vendedor", "cliente"])], deleteUser);
router.post("/login", login);

export default router;
