const { prisma } = require("../prisma/prisma-client")
const ERROR = require("../constraints/errors")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const UserController = {
    login: async (req, res) => {
        const { login, password } = req.body

        if (!login || !password) {
            return res.status(400).json(ERROR.FIELDS_REQUIRED)
        }

        try {
            const user = await prisma.user.findFirst({
                where: { login }
            })

            const invalidLoginData = user && (await bcrypt.compare(password, user.password))

            if (!invalidLoginData) {
                return res.status(400).json(ERROR.LOGIN_OR_PASS)
            }

            const secret = process.env.SECRET_KEY
            if (user && invalidLoginData && secret) {
                res.status(200).json({
                    ...user,
                    token: jwt.sign({ id: user.id }, secret, { expiresIn: '15d' })
                })
            } else {
                res.status(400).json(ERROR.LOGIN_ERROR)
            }


        } catch (error) {
            console.log(error)
            res.status(500).json(ERROR.SERVER_ERROR)
        }
    },
    register: async (req, res) => {
        const { login, email, password } = req.body

        if (!login || !password || !email) {
            return res.status(400).json(ERROR.FIELDS_REQUIRED)
        }

        try {
            const createdUserByEmail = await prisma.user.findFirst({
                where: { email }})
            const createdUserByLogin = await prisma.user.findFirst({
                where: { login }})

            if (createdUserByEmail) {
                return res.status(400).json(ERROR.EMAIL_EXISTS)
            }
            if (createdUserByLogin) {
                return res.status(400).json(ERROR.LOGIN_EXISTS)
            }

            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)

            const user = await prisma.user.create({
                data: {
                    email,
                    login,
                    password: hashedPassword
                }
            })

            const secret = process.env.SECRET_KEY
            if (user && secret) {
                res.status(201).json({
                    ...user,
                    token: jwt.sign({ id: user.id }, secret, { expiresIn: '15d'})
                })
            } else {
                return res.status(400).json(ERROR.REG_ERROR)
            }

        } catch (error) {
            console.log(error)
            res.status(500).json(ERROR.SERVER_ERROR)
        }
    }, 
    current: async (req, res) => {
        return res.status(200).json(req.user)
    }
}

module.exports = UserController