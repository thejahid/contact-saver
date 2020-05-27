const router = require('express').Router()
const { check } = require('express-validator')

//Custom middileware protected routes
const auth = require('../../middleware/auth')

//Call controllers
const {
    getContactController,
    postContactController,
    putContactController,
    deleteContactController,
} = require('../../controllers/contacts')

//Get all contacts routes
router.get('/', auth, getContactController)

//Create new contact
router.post(
    '/',
    [
        auth,
        //Express validator check
        [check('name', 'Name is required.').not().isEmpty()],
    ],
    postContactController
)

router.put('/:id', putContactController)

router.delete('/:id', deleteContactController)

module.exports = router
