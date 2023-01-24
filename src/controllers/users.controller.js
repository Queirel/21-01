const { passwordHash } = require("../utils/bcrypt")
const Users = require("../models/users.models")

const getUsers = async (req, res) => {
    try {
        const getUsers = await Users.findAll({ limit: 1,offset: 0 })
        res.status(200).json(getUsers)
    }
    catch (error) {
        res.status(500).json({ error })
    }
}

const saveUser = async (req, res) => {
    try {
        const { user_name, user_password, user_role } = req.body
        const passHash = await passwordHash(user_password)
        await Users.create({
            user_name,
            user_password: passHash,
            user_role
        })
        const getUsers = await Users.findAll()
        res.status(200).json(getUsers)
    }
    catch (error) {
        res.status(500).json({ error })
    }
}

const getUser = async (req, res) => {
    try {
        const user_id = req.params.id
        const user = await Users.findOne({ where: { user_id } })
        if (user) {
            res.status(200).json(user)
        }
        else {
            res.status(404).send('User does not exists')
        }
    }
    catch (error) {
        res.status(500).json({ error })
    }
}

const updateUser = async (req, res) => {
    try {
        const user_id = req.params.id
        const user = await Users.findOne({ where: { user_id } })
        if (user) {
            const { user_name, user_role } = req.body
            await Users.update({
                user_name,
                user_role
            }, { where: { user_id } })
            res.status(200).json({ user_id, user_name, user_role })
        }
        else {
            res.status(404).send('User does not exists')
        }
    }
    catch (error) {
        res.status(500).json({ error })
    }
}

const deleteUser = async (req, res) => {
    try {
        const user_id = req.params.id
        const user = await Users.findOne({ where: { user_id } })
        if (user) {
            await Users.destroy({ where: { user_id } })
            res.status(200).json(`User ${user_id} deleted`)
        }
        else {
            res.status(404).send('User does not exists')
        }
    }
    catch (error) {
        res.status(500).json({ error })
    }
}

module.exports = {
    getUsers,
    saveUser,
    getUser,
    updateUser,
    deleteUser
}