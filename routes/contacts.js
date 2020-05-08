const router = require('express').Router()

//route     GET /contacts
//@desc     Get all conatcts
//access    Private
router.get('/', (req, res) => {
    res.send('Get all contacts')
})

//route     POST /contacts
//@desc     Add new contact
//access    Private
router.post('/', (req, res) => {
    res.send('Add new contact')
})

//route     PUT /contacts
//@desc     Update contact
//access    Private
router.put('/:id', (req, res) => {
    res.send('Update contact')
})

//route     DELETE /contacts
//@desc     Delete contact
//access    Private
router.delete('/:id', (req, res) => {
    res.send('Delete contact')
})

module.exports = router
