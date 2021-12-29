const Cart = require('../models/cart-model');
function getOneCart(_id) {
    return new Promise((res, rej) => {
        Cart.findOne({ customer: _id }).populate('cartProducts.product').exec((err, cart) => {
            if (err) { return rej(err) }
            res(cart);
        });
    });
}
function addCart(cart) {
    return new Promise((res, rej) => {
        Cart.findOne({ customer: cart.customer }).populate({ path: 'cartProducts.product', populate: { path: 'product' } }).exec((err, foundCart) => {
            if (err) { return rej(err) }
            if (foundCart) {
                foundCart.active ? res({ cart: foundCart, msg: "active" }) : res({ cart: foundCart, msg: "latest" });
            }
            else {
                cart.active = true;
                new Cart(cart).save((err, info) => {
                    if (err) { return rej(err) }
                    res({ cart: info, msg: "new" });
                });
            }
        })
    });
}
function updateCart(cart) {
    return new Promise((res, rej) => {
            Cart.updateOne({ _id: cart._id }, { ...cart }, (err, info) => {
            if (err) { return rej(err) }
            res(info);
        });
    });
}
function closeCart(_id) {
    return new Promise((res, rej) => {
        Cart.updateOne({ _id: _id }, { active: false }, err => err ? rej(err) : res());
    });
}
function deleteCart(_id) {
    return new Promise((res, rej) => {
        Cart.deleteOne({ _id }, (err, info) => {
            if (err) { return rej(err) }
            res(info);
        });
    });
}
module.exports = {
    getOneCart,
    addCart,
    updateCart,
    closeCart,
    deleteCart
};