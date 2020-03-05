const prodCategoryLogic = require('../bll/products-logic').prodCategoriesLogic,
    productLogic = require('../bll/products-logic').productLogic,
    router = require('express').Router();
// Categories Controllers
router.get('/categories', async (req, res) => {
    try {
        const categories = await prodCategoryLogic.getAllCategories();
        return res.status(200).json(categories);
    }
    catch (err) { res.status(500).send(err.message) }
})
router.post('/categories', async (req, res) => {
    try {
        const newCategory = req.body;
        const addedCategory = await prodCategoryLogic.addCategory(newCategory);
        return res.status(200).json(addedCategory);
    }
    catch (err) { res.status(500).send(err.message) }
})
// Products Controllers
router.get('/products', async (req, res) => {
    try {
        const products = await productLogic.getAllProducts();
        return res.status(200).json(products);
    }
    catch (err) { res.status(500).send(err.message) }
});
router.get('/categories/:category', async (req, res) => {
    try {
        const category = req.params.category;
        const products = await productLogic.getProductsByCategory(category);
        return res.status(200).json(products);
    }
    catch (err) { res.status(500).send(err.message) }
});
router.get('/products/:_id', async (req, res) => {
    try {
        const _id = req.params._id;
        const product = await productLogic.getOneProduct(_id);
        return res.status(200).json(product);
    }
    catch (err) { res.status(500).send(err.message) }
});
router.get('/products/search/:val', async (req, res) => {
    try {
        const val = req.params.val;
        const products = await productLogic.getSearchResults(val);
        return res.status(200).json(products);
    }
    catch (err) { res.status(500).send(err.message) }
});
router.post('/products', async (req, res) => {
    try {
        const newProduct = req.body;
        const addedProduct = await productLogic.addProduct(newProduct);
        return res.status(200).json(addedProduct);
    }
    catch (err) { res.status(500).send(err.message) }
})
router.put('/products/:_id', async (req, res) => {
    try {
        const product = req.body;
        const updatedProduct = await productLogic.updateProduct(product);
        return res.status(200).json(updatedProduct);
    }
    catch (err) { res.status(500).send(err.message) }
})
router.delete('/products/:_id', async (req, res) => {
    try {
        const _id = req.params._id;
        await productLogic.deleteProduct(_id);
        return res.status(200);
    }
    catch (err) { res.status(500).send(err.message) }
})
module.exports = router;