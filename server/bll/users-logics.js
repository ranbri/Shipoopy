const Customer = require('../models/customer-model'),
    Admin = require('../models/admin-model');
function updateUser(user) {
    return new Promise((res, rej) => {
        user.admin ? updateAdmin(user.user) : updateCustomer(user.user);
        function updateAdmin(admin) {
            admin = new Admin(admin);
            admin.password = Admin.hashPassword(admin.password);
            Admin.findOneAndUpdate({ username: admin.username }, admin, (err, info) => {
                if (err) { return rej(err) };
                res(info);
            })
        }
        function updateCustomer(customer) {
            Customer.replaceOne({ _id: customer._id }, customer, (err, info) => {
                if (err) { return rej(err) };
                res(info);
            })
        }
    });
}
module.exports = {
    updateUser
}