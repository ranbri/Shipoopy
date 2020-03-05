const mongoose = require('mongoose'),
    bcrypt = require('bcrypt');
const adminSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    username: String,
    password: String
}, { versionKey: false });
adminSchema.statics.hashPassword = function hashPassword(password) {
    return bcrypt.hashSync(password, 10);
}
adminSchema.methods.isValid = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword);
}
const Admin = mongoose.model('Admin', adminSchema, 'admins');
module.exports = Admin;