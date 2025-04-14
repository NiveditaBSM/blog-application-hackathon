const router = require('express').Router()
const jwt = require('jsonwebtoken')
const crypto = require('crypto-js')

const pool = require('../db/db_connection')
const resultProcessing = require('../utils/resultProcessing')
const config = require('../utils/config')

router.post('/login', (request, response) => {
    const { email, password } = request.body

    const sql = `SELECT * FROM user WHERE email = ? AND password = ?`

    const encryptedPassword = crypto.SHA256(password).toString()
    pool.query(sql, [email, encryptedPassword], (error, data) => {
        if (data) {
            if (data.length == 0) {
                response.send(resultProcessing.createErrorResult("Invalid credentials!"))
            } else {
                const user_id = data[0].id
                const full_name = data[0].full_name
                const payload = { user_id }
                console.log(data)
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

    const encryptedPassword = crypto.SHA256(password).toString()

    pool.query(sql, [full_name, email, encryptedPassword, phone_no], (error, data) => {
        response.send(resultProcessing.createResult(error, data))
    })
})

module.exports = router