const { Router } = require("express")
const { getProducts, saveProduct, getProduct, updateProduct, deleteProduct, getProdByCategory, getProductByUserId } = require("../controllers/products.controllers")
const router = Router()

router.get('/', getProducts)
router.post('/', saveProduct)
router.get('/:id', getProduct)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)
router.get('/user/:id', getProductByUserId)
router.get('/category/:category', getProdByCategory)

module.exports = router