import { Router } from "express";
import { createGroup, deleteGroup, getAllGroups, getGroupById, updateGroup } from '../controllers/groups.controller.js';

const router = Router();

router
    .post('/', createGroup)
    .get('/', getAllGroups)
    .get('/:id', getGroupById)
    .put('/:id', updateGroup)
    .delete('/:id', deleteGroup)

export default router;
