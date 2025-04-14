const express = require('express')
const cors = require('cors')

const authorization = require('./middleware/authorization')

const userRouter = require('./routes/user')
const categoryRouter = require('./routes/categories')
const blogRouter = require('./routes/blog')

const app = express()

app.use(cors())
app.use(express.json())
app.use(authorization)

app.use('/user', userRouter)
app.use('/category', categoryRouter)
app.use('/blog', blogRouter)

app.listen(4000, 'localhost', () => {
    console.log("Server started listening on port 4000")
})