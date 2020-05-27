const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const confiq = require('config')

//User model
const User = require('../models/User')

//Signup post controller at /signup
exports.signupPostController = async (req, res) => {
    //Express validator result
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    //Check, hash password, save user & return jsonwebtoken
    const { name, email, password } = req.body
    try {
        //If user already exists
        let user = await User.findOne({ email })
        if (user) {
            res.status(400).json({ errors: [{ msg: 'User already exists.' }] })
        }

        //Make user with User model
        user = new User({
            name,
            email,
            password,
        })

        //Encrypt password
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)

        //Save user
        await user.save()

        //Return jsonwebtoken
        const payload = {
            user: {
                id: user.id,
            },
        }

        jwt.sign(
            payload,
            confiq.get('jwtSecret'),
            { expiresIn: 36000 },
            (err, token) => {
                if (err) throw err
                res.json({ token })
            }
        )
    } catch (e) {
        console.error(e.message)
        res.status(500).send('Server error.')
    }
}

//Login post controller at /login
exports.signupGetController = async (req, res) => {}
