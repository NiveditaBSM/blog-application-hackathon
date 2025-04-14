const express = require('express')
const router = express.Router()

const pool = require('../db/db_connection')
const result = require('../utils/resultProcessing')


router.get('/get_categories',(request,response)=>{
    const sql = 'select * from categories'
    pool.query(sql,(error,data)=>{
        response.send(result.createResult(error,data))
    })
})

router.post('/add_categories',(request,response)=>{
    const{title,description}=request.body
    const sql = 'insert into categories(title,description) values(?,?)'

    pool.query(sql,[title,description],(error,data)=>{
        response.send(result.createResult(error,data))
    })
})

module.exports=router
