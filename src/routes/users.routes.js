const { Router } = require("express");
const { getUsers, getUser, updateUser, deleteUser, saveUser } = require("../controllers/users.controller");
const router = Router()

router.get('/', getUsers)
router.post('/', saveUser)
router.get('/:id', getUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

module.exports = router