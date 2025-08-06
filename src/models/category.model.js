import { Schema, model } from "mongoose";

const categorySchema = new Schema({
    name: { type: String, required: true, unique: true },
    image: { type: String }
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

categorySchema.virtual('products', {
    ref: 'Product',
    localField: '_id',
    foreignField: 'categoryId'
});

const Category = model('Category', categorySchema);
export default Category;
