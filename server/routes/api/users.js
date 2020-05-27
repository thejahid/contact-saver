const router = require('express').Router()
const { check } = require('express-validator')

//Call controllers
const {
    signupPostController,
    signupGetController,
} = require('../../controllers/users')

router.post(
    '/',
    //Express validator check
    [
        check('name', 'Name is required.').not().isEmpty(),
        check('email', 'Please include a vaild email.').isEmail(),
        check(
            'password',
            'Please enter a password with 6 or more characters.'
        ).isLength({ min: 6 }),
    ],
    signupPostController
)

router.get('/', signupGetController)

module.exports = router
