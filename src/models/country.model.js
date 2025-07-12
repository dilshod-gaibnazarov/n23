import { Schema, model } from "mongoose";

const CountrySchema = new Schema({
    name: { type: String, unique: true, required: true },
    language: { type: String },
    valuta: { type: String },
    nationality: { type: String },
    population: { type: Number },
}, {
    timestamps: true,
    virtuals: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

CountrySchema.virtual('cities', {
    ref: 'City',
    localField: '_id',
    foreignField: 'country'
});

const Country = model('Country', CountrySchema);
export default Country;
