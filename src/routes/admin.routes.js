import { Router } from "express";
import controller from '../controllers/admin.controller.js';
import { AuthGuard } from "../guards/auth.guard.js";
import { RolesGuard } from "../guards/role.guard.js";
import { validate } from "../middlewares/validate.js";
import AdminValidation from "../validation/AdminValidation.js";

const router = Router();

router
    .post('/', AuthGuard, RolesGuard('SUPERADMIN'), validate(AdminValidation.create), controller.createAdmin)
    .post('/signin', validate(AdminValidation.signin), controller.signIn)
    .post('/token', controller.generateNewToken)
    .post('/signout', AuthGuard, controller.signOut)
    .get('/', AuthGuard, RolesGuard('SUPERADMIN'), controller.findAll)
    .get('/:id', AuthGuard, RolesGuard('SUPERADMIN', 'ID'), controller.findById)
    .patch('/:id', AuthGuard, RolesGuard('SUPERADMIN', 'ID'), controller.update)
    .delete('/:id', AuthGuard, RolesGuard('SUPERADMIN'), controller.delete)

export default router;
