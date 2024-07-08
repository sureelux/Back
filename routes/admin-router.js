const express = require('express')
const router = express.Router()
const adminController = require('../controller/admin-controller') 
const authenticate = require('../middlewares/authenticate')

//show Data
router.get('/users' , adminController.getUsers)
router.get('/types' , adminController.getTypes)
router.get('/bookings' , adminController.getBookings)
router.get('/tables/', adminController.getTableByID) 
router.get('/tables/:id', adminController.getTBYID) 
router.get('/bookingUser',authenticate, adminController.getBookingUser)
router.get('/typeUser' , adminController.getTypesUser)

//delect
router.delete('/deleteUser/:user_id' , adminController.deleteUser)
router.delete('/deleteTable/:table_id' , adminController.deleteTable)
router.delete('/deleteType/:type_id' , adminController.deleteType)
router.delete('/deleteBooking/:booking_id' , adminController.deleteBooking)

//create
router.post('/tables', adminController.createTables)
router.post('/types' , adminController.createType)
router.post('/bookings' , adminController.createBookings)


//updete

router.patch('/updateType/:type_id' , adminController.updateType)
router.patch('/updateTable/:table_id' , adminController.updateTable)
router.patch('/updateStatus/:table_id' , adminController.updateStatusTable)
router.patch('/updateStatusBooking/:booking_id', adminController.updateStatusBooking)

router.get('/TypeTableUser', adminController.TypeTableUser)

module.exports = router 
