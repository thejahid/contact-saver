const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const confiq = require('config')
const auth = require('../middleware/auth')

//User model
const User = require('../models/Contact')
const Contact = require('../models/Contact')

//Get all the contact
exports.getContactController = async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.user.id }).sort({
            date: -1,
        })
        res.json(contacts)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error.')
    }
}

//Add new contact
exports.postContactController = async (req, res) => {
    //Express validator result
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    //Save new contact & send back to client
    const { name, email, phone, type } = req.body
    try {
        const newContact = new Contact({
            name,
            email,
            phone,
            type,
            user: req.user.id,
        })

        const contact = await newContact.save()

        res.json(contact)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error.')
    }
}
exports.putContactController = async (req, res) => {}
exports.deleteContactController = async (req, res) => {}
