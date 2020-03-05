const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    name: String,
    prodCategory: {type: mongoose.Schema.Types.ObjectId, ref: "ProdCategory"},
    price: Number,
}, { versionKey: false });
const Product = mongoose.model('Product', productSchema, 'products');
module.exports = Product;