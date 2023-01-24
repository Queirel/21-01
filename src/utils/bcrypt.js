const bcryptjs = require('bcryptjs')

const passwordHash = (password) => {
    return bcryptjs.hash(password, 10)
}

const passwordCompare = (password, passHash) => {
    return bcryptjs.compare(password, passHash)
}

module.exports = {
    passwordHash,
    passwordCompare
}