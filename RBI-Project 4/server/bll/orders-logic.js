const Order = require('../models/order-model');
function addOrder(order) {
    return new Promise((res, rej) => {
        new Order(order).save((err, info) => {
            if (err) { return rej(err) };
            res(info);
        });
    });
}
module.exports = {
    addOrder
}