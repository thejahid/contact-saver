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

//Update contact
exports.putContactController = async (req, res) => {
    const { name, email, phone, type } = req.body

    //Build contact object
    const contactFields = {}
    if (name) contactFields.name = name
    if (email) contactFields.email = email
    if (phone) contactFields.phone = phone
    if (type) contactFields.type = type

    try {
        let contact = await Contact.findById(req.params.id)

        if (!contact) return res.status(404).json({ msg: 'Contact not found.' })

        //Make sure user owns contact
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized.' })
        }

        //Now update contact & send back contact
        contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { $set: contactFields },
            { new: true }
        )
        res.json(contact)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error.')
    }
}

//Delete contact
exports.deleteContactController = async (req, res) => {
    try {
        let contact = await Contact.findById(req.params.id)

        if (!contact) return res.status(404).json({ msg: 'Contact not found.' })

        //Make sure user owns contact
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized.' })
        }

        //Now delete contact
        await Contact.findByIdAndRemove(req.params.id)
        res.json({ msg: 'Contact removed.' })
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error.')
    }
}
