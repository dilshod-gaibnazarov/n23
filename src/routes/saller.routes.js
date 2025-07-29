import { Router } from 'express';
import controller from '../controllers/saller.controller.js';
import { uploadFile } from '../middlewares/file-upload.js';
import { validate } from '../middlewares/validate.js';
import sallerValidation from '../validation/SallerValidation.js';

const router = Router();

router
    .post('/', uploadFile.single('file'), controller.createSaller)
    .post('/signin', validate(sallerValidation.signin), controller.signIn)
    .post('/token', controller.generateNewToken)
    .post('/signout', controller.signOut)

    .get('/', controller.findAll)
    .get('/:id', controller.findById)

    .patch('/:id', controller.update)

    .delete('/:id', controller.delete)

export default router;