const express = require('express')
const router = express.Router()
const adminController = require('../controller/admin-controller') 
const authenticate = require('../middlewares/authenticate')

//show Data
router.get('/users', authenticate, adminController.getUsers)
router.get('/types' , authenticate, adminController.getTypes)
router.get('/bookings' , authenticate, adminController.getBookings)  

//delect
router.delete('/deleteUser/:user_id' , authenticate, adminController.deleteUser)
router.delete('/deleteTable/:table_id' , authenticate, adminController.deleteTable)
router.delete('/deleteType/:type_id' , authenticate, adminController.deleteType)


//create
router.post('/tables', authenticate, adminController.createTables)
router.post('/types' , authenticate, adminController.createType)
router.get('/types/check/:type_name',authenticate, adminController.checkTypeExists);
router.get('/tables/check', authenticate, adminController.checkTableNameUnique);

//updete
router.patch('/updateType/:type_id' , authenticate, adminController.updateType)
router.patch('/updateTable/:table_id' , authenticate, adminController.updateTable)
router.patch('/updateStatus/:table_id' , authenticate, adminController.updateStatusTable)
router.patch('/updateStatusBooking/:booking_id', authenticate, adminController.updateStatusBooking)



// router.delete('/deleteBooking/:booking_id' , adminController.deleteBooking)
module.exports = router 
