const express = require('express')

const router = express.Router()

const middleware = require('../middleware/middleware')
const logController = require('../controllers/logcontrollers')
const userController = require('../controllers/usercontrollers')
const jController = require('../controllers/jcontrollers')
const hgcontroller = require('../controllers/goalscontrollers')

// Middleware routing
router.use(middleware.log)

// Base endpoint
router.get('/app', logController.root)

// Log routing
router.get('/app/log/access', logController.getLogs)

// User routing
router.post('/app/new/user/', userController.newUser)
router.get('/app/user/exists', userController.userExists)
router.post('/app/user/signin/', userController.userSignin)
router.patch('/app/update/user/', userController.updateUser)
router.delete('/app/delete/user/', userController.deleteUser)

// Journal routing
router.post('/app/new/entry/', jController.newEntry)
router.post('/app/user/entries/', jController.userEntries)
router.get('/app/all/entries', jController.allEntries)
router.patch('/app/update/entry', jController.updateEntry)
router.delete('/app/delete/entry', jController.deleteEntry)

// Health goals routing
router.get('/app/healthgoals/', hgcontroller.getGoals)
router.post('/app/healthgoals/addgoals', hgcontroller.addGoals)
router.patch('/app/healthgoals/updategoals', hgcontroller.updateGoal)
router.delete('/app/healthgoals/deletegoal', hgcontroller.deleteGoal)

router.use(middleware.notFound)

module.exports = router