const express = require('express');
const UserController = require('../controllers/userController');
const router = express.Router();
const auth = require('../middleware/auth');
const NoteController = require('../controllers/noteController');
const CategoryController = require('../controllers/categoryController');

// User routes
router.post('/user/login', UserController.login)
router.post('/user/register', UserController.register)
router.get('/user', auth, UserController.current)

// Note routes
router.post('/notes', auth, NoteController.create)
router.delete('/notes/:id', auth, NoteController.delete)
router.put('/notes/:id', auth, NoteController.update)
router.get('/notes/:id', auth, NoteController.getById)
router.get('/notes', auth, NoteController.getAll)

// Category routes
router.post('/category', auth, CategoryController.create)
router.delete('/category/:id', auth, CategoryController.delete)
router.get('/category', auth, CategoryController.getAll)

module.exports = router;
