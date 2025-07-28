import { Router } from "express";
import controller from '../controllers/admin.controller.js';
import { AuthGuard } from "../guards/auth.guard.js";
import { RolesGuard } from "../guards/role.guard.js";
import { validate } from "../middlewares/validate.js";
import AdminValidation from "../validation/AdminValidation.js";
import { requestLimiter } from '../utils/request-limit.js';
import { Roles } from '../const/index.js';

const router = Router();

router
    .post('/', AuthGuard, RolesGuard(Roles.SUPERADMIN), validate(AdminValidation.create), controller.createAdmin)
    .post('/signin', requestLimiter(60, 10), validate(AdminValidation.signin), controller.signIn)
    .post('/token', controller.generateNewToken)
    .post('/signout', AuthGuard, controller.signOut)

    .get('/', AuthGuard, RolesGuard(Roles.SUPERADMIN), controller.findAll)
    .get('/:id', AuthGuard, RolesGuard(Roles.SUPERADMIN, 'ID'), controller.findById)

    .patch('/password/:id', AuthGuard, RolesGuard(Roles.SUPERADMIN, 'ID'), validate(AdminValidation.password), controller.updatePasswordForAdmin)
    .patch('/forget-password', validate(AdminValidation.forgetPassword), controller.forgetPassword)
    .patch('/confirm-otp', validate(AdminValidation.confirmOTP), controller.confirmOTP)
    .patch('/confirm-password', validate(AdminValidation.confirmPassword), controller.confirmPassword)
    .patch('/:id', AuthGuard, RolesGuard(Roles.SUPERADMIN, 'ID'), validate(AdminValidation.update), controller.updateAdmin)

    .delete('/:id', AuthGuard, RolesGuard(Roles.SUPERADMIN), controller.delete)

export default router;
