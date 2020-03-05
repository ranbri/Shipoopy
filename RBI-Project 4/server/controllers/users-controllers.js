const router = require('express').Router(),
    passport = require('passport'),
    usersLogic = require('../bll/users-logics');
router.put("/", async (req, res, next) => {
    try {
        const updatedUser = await usersLogic.updateUser(req.body);
        if (req.body.admin) {
            req.body = { username: updatedUser.username, password: req.body.user.password };
            await passport.authenticate('login', (err, user, info) => {
                if (err) return res.status(501).json(err);
                if (info) return res.json(info);
                else {
                    req.logIn(user.user, async (err) => {
                        // console.log(err)
                        if (err) return res.status(501).json(err);
                        req.session.loggedIn = true;
                        await req.session.save(err => { if (err) return console.log(err); });
                        return res.status(200).json(user);
                    })
                }
            })(req, res, next)
        }
        else return res.status(200).json(updatedUser);
    }
    catch (err) { res.status(500).send(err.message) };
});
module.exports = router;