const router = require('express').Router()
const { check } = require('express-validator')

//Custom middileware protected routes
const auth = require('../../middleware/auth')

//Call controllers
const {
    loginGetController,
    loginPostController,
    logoutController,
} = require('../../controllers/auth')

router.post(
    '/',
    //Express validator check
    [
        check('email', 'Please include a vaild email.').isEmail(),
        check('password', 'Password is required.').exists(),
    ],
    loginPostController
)

router.get('/', auth, loginGetController)

router.post('/', logoutController)

module.exports = router
