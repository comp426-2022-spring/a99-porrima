const express = require('express')

const router = express.Router()

const middleware = require('../middleware/middleware')
const logController = require('../controllers/logcontrollers')
const userController = require('../controllers/usercontrollers')
const jController = require('../controllers/jcontrollers')

// Middleware routing
router.use(middleware.log)

// Base endpoint
router.get('/app', logController.root)

// Log routing
router.get('/app/log/access', logController.getLogs)

// User routing
router.post('/new/user/', userController.newUser)
router.get('/user/exists', userController.userExists)
router.post('/app/user/signin', userController.userSignin)
router.patch('/app/update/user/', userController.updateUser)
router.delete('/app/delete/user/', userController.deleteUser)

// Journal routing
router.post('/app/new/entry/', jController.newEntry)
router.post('/app/user/entries/', jController.userEntries)
router.get('/app/all/entries', jController.allEntries)
router.patch('/app/update/entry', jController.updateEntry)
router.delete('/app/delete/entry', jController.deleteEntry)

router.use(middleware.notFound)

module.exports = router