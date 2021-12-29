const Customer = require('../models/customer-model'),
    Admin = require('../models/admin-model'),
    router = require('express').Router(),
    passport = require('passport'),
    { verifyCookie } = require('../middleware/verify-logged-in');
// Registering
router.post('/register', (req, res, next) => {
    try {
        passport.authenticate('register', (err, user, info) => {
            if (err) return res.status(501).json(err);
            if (!user) return res.status(401).json(info);
            req.logIn(user.user, (err) => {
                if (err) return res.status(501).json(err);
                req.session.loggedIn = true;
                req.session.save(err => { if (err) return console.log(err); });
                return res.status(200).json(user);
            })
        })(req, res, next);
    }
    catch (err) { res.status(500).send(err.message) };
});
// Logging In
router.post('/login', async (req, res, next) => {
    try {
        await passport.authenticate('login', (err, user, info) => {
            if (err) return res.status(501).json(err);
            if (info) return res.status(401).json(info);
            else {
                req.logIn(user.user, (err) => {
                    if (err) return res.status(501).json(err);
                    req.session.loggedIn = true;
                    req.session.save(err => { if (err) return console.log(err); });
                    return res.status(200).json(user);
                })
            }
        })(req, res, next);
    }
    catch (err) { res.status(500).send(err.message) };
});
// Logging Out
router.post('/logout/:ent', (req, res, next) => {
    const user = req.body;
    const logOutUser = (user) => {
        req.session.destroy();
        req.logOut();
        res.status(200).json(user);
    }
    (req.params.ent === "customer") ?
        Customer.findOne({ _id: user._id }, (err, info) => { err ? res.status(500).json(err) : logOutUser(info); }) :
        Admin.findOne({ _id: user._id }, (err, info) => { err ? res.status(500).json(err) : logOutUser(info); });
});
// Logging In Using Cookie
router.get('/cookie', verifyCookie, (req, res) => {
    Customer.findById(req.user._id, (err, info) => {
        if(info) return res.status(200).json({user: req.user, admin: false});
        return res.status(200).json({user: req.user, admin: true});
    });
});
module.exports = router;