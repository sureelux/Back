const express = require('express')
const router = express.Router()
const userController = require('../controller/user-controller')
const authenticate = require('../middlewares/authenticate')

router.get('/bookingUser', authenticate, userController.getBookingUser)

router.post('/bookings' , authenticate, userController.createBookings)

router.get('/tables/:id', authenticate, userController.getTBYID)

router.get('/TypeTableUser', authenticate, userController.TypeTableUser)

router.get('/typeuser' , userController.getTypesUser)

router.get('/tables/', authenticate,userController.getTableByID)

router.put('/:user_id', authenticate, userController.updateUser)


module.exports = router 