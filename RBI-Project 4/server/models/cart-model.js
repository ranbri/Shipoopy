const mongoose = require('mongoose');
const cartSchema = mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
    date: Date,
    cartProducts: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quant: Number,
        totalPrice: Number
    }],
    overallPrice: Number,
    active: Boolean
}, { versionKey: false });
const Cart = mongoose.model('Cart', cartSchema, 'carts');
module.exports = Cart;