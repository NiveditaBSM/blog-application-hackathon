const express = require('express')
const cors = require('cors')

const authorization = require('./middleware/authorization')

const userRouter = require('./routes/user')
const app = express()

app.use(cors())
app.use(express.json())
app.use(authorization)

app.use('/user', userRouter)

app.get('/', (request, response) => {
    response.send("Hello from backend server!")
})

app.listen(4000, 'localhost', () => {
    console.log("Server started listening on port 4000")
})