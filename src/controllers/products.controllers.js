const Products = require("../models/products.models");

const getProducts = async (req, res) => {
    try {
        const getProds = await Products.findAll({offset: 5, limit: 5 })
        res.status(200).json(getProds)
    }
    catch (error) {
        res.status(500).json({ error })
    }
}

const saveProduct = async (req, res) => {
    
        const { prod_name, prod_user_id, prod_price, prod_stock, prod_category } = req.body
        await Products.create({
            prod_name,
            prod_user_id,
            prod_price,
            prod_stock,
            prod_category
        })
        const getProducts = await Products.findAll()
        res.status(200).json(getProducts)
}

const getProduct = async (req, res) => {
    try {
        const prod_id = req.params.id
        const product = await Products.findOne({ where: { prod_id } })
        if (product) {
            res.status(200).json(product)
        }
        else {
            res.status(404).send('Product does not exist')
        }
    }
    catch (error) {
        res.status(500).json({ error })
    }
}

const updateProduct = async (req, res) => {
    try {
        const prod_id = req.params.id
        const product = await Products.findOne({ where: { prod_id } })
        if (product) {
            const { prod_name, prod_user_id, prod_price, prod_stock, prod_category } = req.body
            await Products.update({
                prod_name,
                prod_user_id,
                prod_price,
                prod_stock,
                prod_category,
            }, {
                where: { prod_id }
            })
            res.status(200).json({ prod_name, prod_user_id, prod_price, prod_stock, prod_category })
        }
        else {
            res.status(404).send('Product does not exists')
        }
    }
    catch (error) {
        res.status(500).json({ error })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const prod_id = req.params.id
        const product = await Products.findOne({ where: { prod_id } })
        if (product) {
            await Products.destroy({ where: { prod_id } })
            res.status(200).json(`Product ${prod_id} deleted`)
        }
        else {
            res.status(404).send('Product does not exists')
        }
    }
    catch (error) {
        res.status(500).json({ error })
    }
}

const getProductByUserId = async (req, res) => {
    try {
        const prod_user_id = req.params.id
        const product = await Products.findAll({ where: { prod_user_id } })
        if (product) {
            res.status(200).json(product)
        }
        else {
            res.status(404).send('There is no products from the user')
        }
    }
    catch (error) {
        res.status(500).json({ error })
    }
}

const getProdByCategory = async (req, res) => {
    try {
        const prod_category = req.params.category
        console.log(prod_category)
                    const product = await Products.findAll({ where: { prod_category } })
            if (product) {
                res.status(200).json(product)
            }
            else {
                res.status(404).send('There is no products from that category')
            }
    }
    catch (error) {
        res.status(500).json({ error })
    }
}

module.exports = {
    getProducts,
    saveProduct,
    getProduct,
    updateProduct,
    deleteProduct,
    getProductByUserId,
    getProdByCategory
}