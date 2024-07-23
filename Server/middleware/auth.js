const ERROR = require("../constraints/errors")
const jwt = require("jsonwebtoken")
const { prisma } = require("../prisma/prisma-client")

const auth = async (req, res, next) => {
    try {
        let token = req.headers.authorization?.split(' ')[1]

        if (!token) {
            return res.status(401).json(ERROR.UNAUTH)
        }

        const secret = process.env.SECRET_KEY
        let userId = null

        jwt.verify(token, secret, (err, { id }) => {
            if (err)
                return res.status(400).json(ERROR.INVALID_TOKEN)

            userId = id
        })

        const user = await prisma.user.findUnique({where: {id: userId}})
        if (!user) {
            return res.status(400).json(ERROR.AUTH)
        }

        req.user = user
        next()
    } catch (error) {
        console.log(error)
        res.status(500).json(ERROR.AUTH)
    }
}

module.exports = auth