import { Schema } from "mongoose";

export const deviceSchema = new Schema({
    deviceId: { type: String, unique: true },
    osName: { type: String },
    clientType: { type: String },
    clientName: { type: String },
    deviceType: { type: String }
}, { timestamps: true, versionKey: false });
