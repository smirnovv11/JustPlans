const { prisma } = require("../prisma/prisma-client")
const ERROR = require("../constraints/errors")

const NoteController = {
    create: async (req, res) => {
        const { title, content, categoryId } = req.body
        const user = req.user

        if (!title || !categoryId) {
            return res.status(400).json(ERROR.FIELDS_REQUIRED)
        }
        
        try {
            const note = await prisma.notes.create({
                data: {
                    title,
                    content,
                    categoryId,
                    userId: user.id
                }
            })

            if (!note) 
                return res.status(400).json(ERROR.NOTE_ADD)

            return res.status(201).json(note)
        } catch (error) {
            console.log(error)
            res.status(500).json(ERROR.SERVER_ERROR)
        }
    },
    update: async (req, res) => {
        const { title, content, categoryId } = req.body
        const {id} = req.params
        const user = req.user

        if (!id || !title || !categoryId) {
            return res.status(400).json(ERROR.FIELDS_REQUIRED)
        }

        try {
            const notes = await prisma.notes.updateMany({
                where: {
                    id,
                    userId: user.id
                },
                data: {
                    title,
                    content,
                    categoryId
                }
            })

            if (notes.count === 0) 
                return res.status(400).json(ERROR.NOTE_UPD)

            return res.status(201).json(notes)
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
            const deleted = await prisma.notes.deleteMany({
                where: {
                    userId: user.id,
                    id
                }
            })

            if (deleted.count === 0) 
                return res.status(400).json(ERROR.NOTE_DELETE)

            return res.status(201).json(deleted)
        } catch (error) {
            console.log(error)
            res.status(500).json(ERROR.SERVER_ERROR)
        }
    },
    getById: async (req, res) => {
        const { id } = req.params

        if (!id) {
            return res.status(400).json(ERROR.FIELDS_REQUIRED)
        }

        try {
            const note = await prisma.notes.findUnique({where: {id}})

            if (!note)
                return res.status(404).json(ERROR.NOTE_NOTEXISTS)

            return res.status(200).json(note)
        } catch (error) {
            console.log(error)
            res.status(500).json(ERROR.SERVER_ERROR)
        }
    },
    getAll: async (req, res) => {
        const user = req.user

        try {
            const notes = await prisma.notes.findMany({
                where: {
                    userId: user.id,
                },
                orderBy: {
                    createdAt: 'desc'
                }
            })

            res.status(200).json(notes)
        } catch (error) {
            console.log(error)
            res.status(500).json(ERROR.SERVER_ERROR)
        }
    }
}

module.exports = NoteController