import { Router } from "express";
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from "../controllers/users.controller.js";

const router = Router();

router
    .post('/', createUser)
    .get('/', getAllUsers)
    .get('/:id', getUserById)
    .put('/:id', updateUser)
    .delete('/:id', deleteUser)

export default router;