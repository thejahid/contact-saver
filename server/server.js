const express = require('express')
const connectDB = require('../config/db')

const app = express()

//Init Middleware
app.use(express.json({ extended: false }))

//Connect Database
connectDB()

//Define Routes
//registration / user routes
app.use('/routes/api/users', require('./routes/api/users'))
//auth routes
app.use('/routes/api/auth', require('./routes/api/auth'))
//contact routes
app.use('/routes/api/contacts', require('./routes/api/contacts'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server running at port ${PORT}`))
