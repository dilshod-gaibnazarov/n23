import Joi from "joi";

class SallerValidation {
    static passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    static phoneRegex = /^(\+?[1-9]\d{0,3})?[-.\s]?(\(?[1-9]\d{0,4}\)?)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{0,9}$/;

    create() {
        return Joi.object({
            phoneNumber: Joi.string().pattern(SallerValidation.phoneRegex).required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(SallerValidation.passwordRegex).required(),
            fullName: Joi.string().required(),
            address: Joi.string()
        });
    }

    signin() {
        return Joi.object({
            phoneNumber: Joi.string().required(),
            password: Joi.string().required()
        });
    }

    update() {
        return Joi.object({
            phoneNumber: Joi.string().pattern(SallerValidation.phoneRegex).optional(),
            email: Joi.string().email().optional(),
            password: Joi.string().pattern(SallerValidation.passwordRegex).optional(),
            fullName: Joi.string().optional(),
            address: Joi.string().optional(),
            isActive: Joi.boolean().optional()
        });
    }

    wallet() {
        return Joi.object({
            wallet: Joi.number().min(0).required()
        });
    }
}

export default new SallerValidation();
