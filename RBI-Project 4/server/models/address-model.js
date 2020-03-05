const mongoose = require('mongoose');
const addressSchema = mongoose.Schema({
    city: String,
    street: String,
    house: Number,
    entrance: Number,
    floor: Number,
    apartment: Number
})
const Address = mongoose.model('Address', addressSchema);
module.exports = Address;