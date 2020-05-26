const express = require('express')
const connectDB = require('../config/db')

const app = express()

//Init Middleware
app.use(express.json({ extended: false }))

//Connect Database
connectDB()

//Define Routes
app.use('/routes/api', require('./routes/api/auth'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server running at port ${PORT}`))
