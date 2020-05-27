const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const confiq = require('config')

//User model
const User = require('../models/User')

//Login post controller at /login
exports.loginPostController = async (req, res) => {
    //Express validator result
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    //Check user, match password & return jsonwebtoken
    const { email, password } = req.body

    //check is user exists
    try {
        let user = await User.findOne({ email })
        if (!user) {
            res.status(400).json({ msg: 'Invalid credentials.' })
        }

        //check password / match password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            res.status(400).json({ msg: 'Invalid credentials.' })
        }

        //If everything ok return jsonwebtoken
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
    } catch (err) {
        console.error('err.message')
        res.status(500).send('Server error.')
    }
}

//Login get controller at /login
exports.loginGetController = async (req, res) => {
    //first auth middleware passed & then get user data
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error.')
    }
}

exports.logoutController = (req, res, next) => {}
