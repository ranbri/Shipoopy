const cartsLogic = require('../bll/carts-logic'),
    router = require('express').Router();
router.get('/:_id', async (req, res) => {
    try {
        const cart = await cartsLogic.getOneCart(req.params._id);
        return res.status(200).json(cart);
    }
    catch (err) { res.status(500).send(err.message) }
});
router.post('/', async (req, res) => {
    try {
        const addedCart = await cartsLogic.addCart(req.body);
        return res.status(200).json(addedCart);
    }
    catch (err) { res.status(500).send(err.message) }
});
router.put('/', async (req, res) => {
    try {
        const updatedCart = await cartsLogic.updateCart(req.body);
        return res.status(200).json(updatedCart);
    }
    catch (err) { res.status(500).send(err.message) }
});
router.get('/close/:_id', async (req, res) => {
    try {
        await cartsLogic.closeCart(req.params._id);
        return res.status(200).send("");
    }
    catch (err) { res.status(500).send(err.message) }
});
router.delete('/:_id', async (req, res) => {
    try {
        return res.status(200).json(await cartsLogic.deleteCart(req.params._id));
    }
    catch (err) { res.status(500).send(err.message) }
});
module.exports = router;