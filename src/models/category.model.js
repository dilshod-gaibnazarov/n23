import { Schema, model } from "mongoose";

const CategorySchema = new Schema({
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

CategorySchema.virtual('products', {
    ref: 'Product',
    localField: '_id',
    foreignField: 'categoryId'
});

const Category = model('Category', CategorySchema);
export default Category;
