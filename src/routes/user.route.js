import { Router } from "express";
import { getAllUsers, getUserById,addUser, updateUser, deleteUser } from "../controller/user.controller.js";

const router = Router();

router.get('/', getAllUsers)
    .get('/:id', getUserById)
    .post('/',addUser)
    .put('/:id', updateUser)
    .delete('/:id', deleteUser)

export default router;
