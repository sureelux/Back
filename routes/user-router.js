const express = require('express')
const router = express.Router()
const userController = require('../controller/user-controller')
const authenticate = require('../middlewares/authenticate')

router.get('/bookingUser',authenticate, userController.getBookingUser)
router.post('/bookings' , userController.createBookings)
router.get('/tables/:id', userController.getTBYID)
router.get('/TypeTableUser', userController.TypeTableUser)
router.get('/typeUser' , userController.getTypesUser)
router.get('/tables/', userController.getTableByID)

module.exports = router 