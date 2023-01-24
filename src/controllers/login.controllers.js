const Users = require("../models/users.models")
const { passwordCompare } = require("../utils/bcrypt")
const jwt = require("jsonwebtoken")

const login = async (req, res) => {
    try {
        const { user_id, user_password } = req.body
        const user = await Users.findOne({ where: { user_id } })
        const passCompare = await passwordCompare(user_password, user.user_password)
        if (passCompare) {
            const payload = {
                user_id,
                user_role: user.user_role
            }
            jwt.sign(payload, process.env.TOKEN_PASSWORD, (error, token) => {
                if (error) {
                    res.status(404).send(`Error while procesing token ${error}`)
                }
                else {
                    res.status(200).json({ token })
                }
            })
        }
        else {
            res.status(404).send('User id or password incorrect')
        }
    }
    catch (error) {
        res.status(500).json({ error })
    }
}

module.exports = login