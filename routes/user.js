const express = require('express')
const router = express.Router()
const passport = require('passport')

const { userLogin, userRegister, sendOTP,
    updatePassword, verifyEmail,
    getUser, updateUser, allUser, deleteUser, deactiveOrBlockUser, activeOrUnblockUser } = require('../controllers/user')

//USER REGISTER
router.post('/register', userRegister)

// USER LOGIN
router.post('/login', userLogin)

//SEND OTP
router.post('/sendOTP', sendOTP)

//verifyEmail
router.post('/verifyEmail', verifyEmail)

//UPDATE PASSWORD
router.post('/updatePassword', updatePassword)

//GET USER BY ID
router.get('/singleUser', passport.authenticate('jwt', { session: false }), getUser)

//UPDATE USER
router.put('/editDetails', passport.authenticate('jwt', { session: false }), updateUser)

//DELTE USER
router.delete('/delete', passport.authenticate('jwt', { session: false }), deleteUser)

//Users 
router.get('/allusers', passport.authenticate('jwt', { session: false }), allUser)

//decativate user 
router.put('/deactivate-user', passport.authenticate('jwt', { session: false }), deactiveOrBlockUser)

//ativate user 
router.put('/activate-user', passport.authenticate('jwt', { session: false }), activeOrUnblockUser)
module.exports = router