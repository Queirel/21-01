const jwt = require("jsonwebtoken")

const middleware = (req, res, next) => {
    try {
        if (req.path != '/login') {
            const bearerToken = req.headers['authorization']
            if (bearerToken) {
                token = bearerToken.split(' ')[1]
                jwt.verify(token, process.env.TOKEN_PASSWORD, (error, data) => {
                    if (error) {
                        res.status(403).send('Some error while verifying token')
                    }
                    else {
                        if (req.method == 'GET') {
                            next()
                        }
                        else {
                            if (data.user_role == 'admin') {
                                next()
                            }
                            else {
                                res.status(403).send('U dont have permission to be here')
                            }
                        }
                    }
                })
            }
            else {
                res.status(403).send('U need a token first')
            }
        }
        else {
            next()
        }
    }
    catch (error) {
        res.status(500).json({error})
    }
}

module.exports = middleware