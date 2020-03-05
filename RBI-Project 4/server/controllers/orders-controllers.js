const orderLogic = require('../bll/orders-logic'),
    router = require('express').Router();
router.post('/', async (req, res) => {
    try {
        res.status(201).json(await orderLogic.addOrder(req.body));
    }
    catch (err) { res.status(500).send(err.message) }
});
module.exports = router;