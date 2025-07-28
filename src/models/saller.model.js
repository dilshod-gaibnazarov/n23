import { Schema, model } from "mongoose";
import { Roles } from "../const/index.js";

const SallerSchema = new Schema({
    phoneNumber: { type: String, unique: true, required: true },
    fullName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    hashedPassword: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    image: { type: String },
    address: { type: String },
    role: { type: String, default:  Roles.SALLER}
}, { timestamps: true, versionKey: false });

const Saller = model('Saller', SallerSchema);
export default Saller;
