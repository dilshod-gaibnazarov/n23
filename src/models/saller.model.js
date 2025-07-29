import { Schema, model } from "mongoose";
import { Roles } from "../const/index.js";

const SallerSchema = new Schema({
    phoneNumber: { type: String, unique: true, required: true },
    fullName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    hashedPassword: { type: String, required: true },
    isActive: { type: Boolean, default: false },
    wallet: { type: Number, default: 0 },
    image: { type: String },
    address: { type: String },
    role: { type: String, default: Roles.SALLER },
}, {
    timestamps: true,
    versionKey: false,
    virtuals: true,
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});

SallerSchema.virtual('products', {
    ref: 'Product',
    localField: '_id',
    foreignField: 'saller'
});

const Saller = model('Saller', SallerSchema);
export default Saller;
