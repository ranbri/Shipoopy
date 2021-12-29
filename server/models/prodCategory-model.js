const mongoose = require('mongoose');
const prodCategorySchema = mongoose.Schema({
    name: String
}, { versionKey: false });
const ProdCategory = mongoose.model('ProdCategory', prodCategorySchema, 'prodCategories');
module.exports = ProdCategory;