const { prisma } = require("../prisma/prisma-client")
const ERROR = require("../constraints/errors")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const CategoryController = {
    create: async (req, res) => {
        const { name } = req.body
        const user = req.user

        if (!name) {
            return res.status(400).json(ERROR.FIELDS_REQUIRED)
        }

        try {
            const category = await prisma.category.create({
                data: {
                    name,
                    userId: user.id
                }
            })

            if (!category)
                return res.status(400).json(ERROR.CATEGORY_ADD)

            return res.status(201).json(category)
        } catch (error) {
            console.log(error)
            res.status(500).json(ERROR.SERVER_ERROR)
        }
    },
    delete: async (req, res) => {
        const {id} = req.params
        const user = req.user

        if (!id) {
            return res.status(400).json(ERROR.FIELDS_REQUIRED)
        }

        try {
            const deleted = await prisma.category.deleteMany({
                where: {
                    id: id,
                    userId: user.id
                }
            })

            if (deleted.count === 0)
                return res.status(404).json(ERROR.CATEGORY_NO)

            return res.status(201).json(deleted)
        } catch (error) {
            console.log(error)
            res.status(500).json(ERROR.SERVER_ERROR)
        }
    },
    getAll: async (req, res) => {
        const user = req.user

        try {
            const categories = await prisma.category.findMany({
                where: {
                    userId: user.id
                }
            })

            res.status(200).json(categories)
        } catch (error) {
            console.log(error)
            res.status(500).json(ERROR.SERVER_ERROR)
        }
    }
}

module.exports = CategoryController