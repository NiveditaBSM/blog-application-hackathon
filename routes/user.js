const router = require('express').Router()
const jwt = require('jsonwebtoken')

const pool = require('../db/db_connection')
const resultProcessing = require('../utils/resultProcessing')
const config = require('../utils/config')

router.post('/login', (request, response) => {
    const { email, password } = request.body

    const sql = `SELECT * FROM users WHERE email = ? AND password = ?`

    pool.query(sql, [email, password], (error, data) => {
        if (data) {
            if (data.length == 0) {
                response.send(resultProcessing.createErrorResult("Invalid credentials!"))
            } else {
                const user_id = data[0].id
                const full_name = data[0].name
                const payload = { user_id }

                const token = jwt.sign(payload, config.SECRET)
                const responseData = {
                    token,
                    full_name
                }
                response.send(resultProcessing.createSuccessResult(responseData))
            }
        } else {
            response.send(resultProcessing.createErrorResult(error))
        }
    })
})

router.post('/register', (request, response) => {
    const { full_name, email, password, phone_no } = request.body

    const sql = `INSERT INTO user (full_name, email, password, phone_no)
                VALUES(?, ?, ?, ?)`

    pool.query(sql, [full_name, email, password, phone_no], (error, data) => {
        response.send(resultProcessing.createResult(error, data))
    })
})

module.exports = router