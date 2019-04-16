const express = require('express')

const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')

const app = express()
app.use(express.json())

app.use('/api/user', userRoutes)
app.use('/api/post', postRoutes)

const port = 5000

app.listen(port)