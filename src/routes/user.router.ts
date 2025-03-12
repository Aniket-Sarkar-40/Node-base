import { Router } from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller";
import { validateUser } from "../validations/user.validation";

const router = Router();

// POST /users
router.post("/", validateUser, createUser);

// GET /users
router.get("/", getAllUsers);

// GET /users/:userId
router.get("/:userId", getUserById);

// PUT /users/:userId
router.put("/:userId", validateUser, updateUser);

// DELETE /users/:userId
router.delete("/:userId", deleteUser);

export default router;
