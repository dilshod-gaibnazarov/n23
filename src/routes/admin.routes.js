import { Router } from "express";
import controller from '../controllers/admin.controller.js';
import { AuthGuard } from "../guards/auth.guard.js";
import { RolesGuard } from "../guards/role.guard.js";
import { validate } from "../middlewares/validate.js";
import AdminValidation from "../validation/AdminValidation.js";
import { requestLimiter } from '../utils/request-limit.js';

const router = Router();

router
    .post('/', AuthGuard, RolesGuard('SUPERADMIN'), validate(AdminValidation.create), controller.createAdmin)
    .post('/signin', requestLimiter(60, 10), validate(AdminValidation.signin), controller.signIn)
    .post('/token', controller.generateNewToken)
    .post('/signout', AuthGuard, controller.signOut)
    .get('/', AuthGuard, RolesGuard('SUPERADMIN'), controller.findAll)
    .get('/:id', AuthGuard, RolesGuard('SUPERADMIN', 'ID'), controller.findById)
    .patch('/password/:id', AuthGuard, RolesGuard('SUPERADMIN', 'ID'), validate(AdminValidation.password), controller.updatePasswordForAdmin)
    .patch('/:id', AuthGuard, RolesGuard('SUPERADMIN', 'ID'), validate(AdminValidation.update), controller.updateAdmin)
    .delete('/:id', AuthGuard, RolesGuard('SUPERADMIN'), controller.delete)

export default router;
