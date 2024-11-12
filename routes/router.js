const express = require('express')
const userController= require('../contollers/userController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')

const router= new express.Router()

router.post('/register',userController.registerController)
router.post('/login',userController.loginController)
router.get('/all-users',jwtMiddleware,userController.allUserController)
router.get('/one-user',jwtMiddleware,userController.oneUserController)




module.exports = router