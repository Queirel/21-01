const Transactions = require("../models/transactions.models")

const getTransactions = async (req, res) => {
    try {
        const getTs = await Transactions.findAll()
        res.status(200).json(getTs)
    }
    catch (error) {
        res.status(500).json({ error })
    }
}

const saveTransaction = async (req, res) => {
    try {
        const { trans_prod_id, trans_buy_user_id } = req.body
        await Transactions.create({
            trans_prod_id,
            trans_buy_user_id,
        })
        const getTransaction = await Transactions.findAll()
        res.status(200).json(getTransaction)
    }
    catch (error) {
        res.status(500).json({ error })
    }
}

const getTransaction = async (req, res) => {
    try {
        const trans_id = req.params.id
        const transaction = await Transactions.findOne({ where: { trans_id } })
        if (transaction) {
            res.status(200).json(transaction)
        }
        else {
            res.status(404).send('Transaction does not exists')
        }
    }
    catch (error) {
        res.status(500).json({ error })
    }
}

const updateTransaction = async (req, res) => {
    try {
        const trans_id = req.params.id
        const transaction = await Transactions.findOne({ where: { trans_id } })
        if (transaction) {
            const { trans_prod_id, trans_buy_user_id } = req.body
            await Transactions.update({
                trans_prod_id,
                trans_buy_user_id,
            }, {
                where: { trans_id }
            })
            res.status(200).json({ trans_id, trans_prod_id, trans_buy_user_id })
        }
        else {
            res.status(404).send('Transaction does not exists')
        }
    }
    catch (error) {
        res.status(500).json({ error })
    }
}

const deleteTransaction = async (req, res) => {
    try {
        const trans_id = req.params.id
        const transaction = await Users.findOne({ where: { trans_id } })
        if (transaction) {
            await Users.destroy({ where: { trans_id } })
            res.status(200).json(`Transaction ${trans_id} deleted`)
        }
        else {
            res.status(404).send('Transaction does not exists')
        }
    }
    catch (error) {
        res.status(500).json({ error })
    }
}

module.exports = {
    getTransaction,
    saveTransaction,
    getTransactions,
    updateTransaction,
    deleteTransaction
}

