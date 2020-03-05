const mongoose = require('mongoose'),
    bcrypt = require('bcrypt');
const customerSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    email: String,
    password: String,
    phone: String,
    address: { type: mongoose.Schema.Types.Mixed, ref: 'Address' }
}, { versionKey: false });
customerSchema.statics.hashPassword = function hashPassword(password) {
    return bcrypt.hashSync(password, 10);
}
customerSchema.methods.isValid = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword);
}
const Customer = mongoose.model('Customer', customerSchema, 'customers');
module.exports = Customer;