const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const resultProcessing = require('../utils/resultProcessing')

const authorization = (request, response, next) => {

    const path = request.url
    console.log(path)
    if (path != '/user/login' && path != '/user/register') {
        const token = request.headers.token
        if (token) {
            try {
                const payload = jwt.verify(token, config.SECRET)
                const user_id = payload.user_id
                request.headers.user_id = user_id
                next()
            } catch (ex) {
                response.send(resultProcessing.createErrorResult("Invalid token"))
            }
        } else {
            response.send(resultProcessing.createErrorResult("Token is missing"))
        }
    } else {
        next()
    }

}

module.exports = authorization