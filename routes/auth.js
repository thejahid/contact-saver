const router = require('express').Router()

//route     GET /users
//@desc     Get logged in user
//access    Private
router.get('/', (req, res) => {
    res.send('Get logged in user')
})

//route     POST /users
//@desc     Auth user & get token
//access    PUblice
router.post('/', (req, res) => {
    res.send('Log in user')
})

module.exports = router
