import { Schema, model } from "mongoose";

const productSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number },
    quantity: { type: Number },
    description: { type: String },
    sallerId: { type: Schema.Types.ObjectId, ref: 'Saller' },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category' }
}, { timestamps: true, versionKey: false });

const Product = model('Product', productSchema);
export default Product;
