import { BaseController } from './base.controller.js';

class UserController extends BaseController {
    constructor() {
        super('users');
    }
}

export default new UserController();
