import { Router } from "express";
import { createStudent } from "../controllers/students.controller.js";

const router = Router();

router
    .post('/', createStudent)

export default router;
