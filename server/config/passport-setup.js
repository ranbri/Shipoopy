const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    Customer = require('../models/customer-model'),
    Admin = require('../models/admin-model');
passport.use('login', new LocalStrategy(
    (username, password, done) => {
        const findCustomer = new Promise((res, rej) => {
            Customer.findOne({ username }, (err, customer) => {
                if (err) return rej((err));
                if (customer) return res({ user: customer, admin: false });
                setTimeout(() => {
                    if (!customer) return res({ admin: null });
                }, 2500);
            });
        });
        const findAdmin = new Promise((res, rej) => {
            Admin.findOne({ username }, (err, admin) => {
                if (err) return rej((err));
                if (admin) return res({ user: admin, admin: true });
            });
        });
        Promise.race([findAdmin, findCustomer]).then(user => {
            switch (user.admin) {
                case null:
                    return done(null, false, { message: "User Doesn't Exists" });
                case true:
                    user = new Admin(user.user);
                    if (user.password.length === 0) return done((null, false, { user: user, message: "Missing Password" }));
                    if (!user.isValid(password, user.password)) return done(null, false, { message: "Incorrect Password" });
                    return done(null, { user: user, admin: true });
                case false:
                    user = new Customer(user.user);
                    if (!user.isValid(password, user.password)) return done(null, false, { message: "Incorrect Password" });
                    return done(null, { user: user, admin: false });
            };
        });
    }
));
passport.use('register', new LocalStrategy({
    passReqToCallback: true
}, (req, email, password, done) => {
    return new Promise((res, rej) => {
        Customer.findOne({ email }, (err, user) => {
            if (err) return rej(done(err));
            if (user) return res(done(null, false, 'Email is already registered'));
            else {
                const newCustomer = new Customer({ ...req.body });
                newCustomer.username = email;
                newCustomer.password = Customer.hashPassword(password);
                newCustomer.save(function (err) {
                    if (err) return res(res.status(501).json(err));
                    return res(done(null, { user: newCustomer, admin: false }));
                });
            }
        })
    });
}));
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    Customer.findById(id, (err, user) => {
        if (!user) {
            Admin.findById(id, (err, user) => {
                if (!err) return done(err, user);
            })
        }
        else return done(err, user);
    });
});
module.exports = passport;