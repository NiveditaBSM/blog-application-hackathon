const router = require('express').Router()
const jwt = require('jsonwebtoken')

const pool = require('../db/db_connection')
const resultProcessing = require('../utils/resultProcessing')
const config = require('../utils/config')

router.get('/getAllBlogs', (request, response) => {
    const sql = `SELECT blogs.id, blogs.title, c.title as 'category', blogs.created_time, u.full_name as 'author', blogs.user_id
    FROM blogs, user u, categories c
    WHERE blogs.user_id = u.id AND blogs.category_id = c.id`

    pool.query(sql, (error, data) => {
        response.send(resultProcessing.createResult(error, data))
    })
})

router.get('/getMyBlogs', (request, response) => {
    const sql = `SELECT blogs.id, blogs.title, c.title as 'category', blogs.created_time, u.full_name as 'author', user_id
    FROM blogs, user u, categories c
    WHERE blogs.user_id = u.id AND blogs.category_id = c.id AND blogs.user_id = ?`
    const user_id = request.headers.user_id

    pool.query(sql, user_id, (error, data) => {
        response.send(resultProcessing.createResult(error, data))
    })
})

router.get('/getBlog/:id', (request, response) => {
    const blog_id = request.params.id
    const sql = `SELECT blogs.id, blogs.title, c.title as 'category', blogs.created_time, u.full_name as 'author', user_id
    FROM blogs, user u, categories c
    WHERE blogs.user_id = u.id AND blogs.category_id = c.id AND blogs.id = ?`

    pool.query(sql, blog_id, (error, data) => {
        response.send(resultProcessing.createResult(error, data))
    })
})

router.post('/createBlog', (request, response) => {
    const sql = `INSERT INTO blogs (title, contents, user_id, category_id)
                 VALUES (?, ?, ?, ?)`

    const { title, contents, category_id } = request.body
    const user_id = request.headers.user_id

    pool.query(sql, [title, contents, user_id, category_id], (error, data) => {
        response.send(resultProcessing.createResult(error, data))
    })
})

router.put('/editBlog', (request, response) => {
    const sql = `UPDATE blogs SET title = ?, category_id=?, contents=?
                WHERE user_id = ? AND id = ? `

    const { title, category_id, contents, blog_id } = request.body

    const user_id = request.headers.user_id
    pool.query(sql, [title, category_id, contents, user_id, blog_id], (error, data) => {
        response.send(resultProcessing.createResult(error, data))
    })
})

router.get('/searchBlogs/', (request, response) => {
    const searchString = request.query.searchString
    const sql = `SELECT b.title as blog_title, c.title as category, contents
                 FROM blogs b 
                 JOIN categories c 
                 ON b.category_id = c.id
                 WHERE b.title LIKE '%${searchString}%' OR c.title LIKE '%${searchString}%' OR contents LIKE '%${searchString}%'`

    pool.query(sql, (error, data) => {
        response.send(resultProcessing.createResult(error, data))
    })

})

router.delete('/:blog_id', (request, response) => {
    const blog_id = request.params.blog_id
    const user_id = request.headers.user_id
    const sql = `DELETE FROM blogs WHERE id = ? AND user_id = ?`

    pool.query(sql, [blog_id, user_id], (error, data) => {
        if (data) {
            if (data.affectedRows = 1) {
                response.send("Blog not found")
            } else {
                response.send("Blog deleted success")
            }
        } else {
            response.send(resultProcessing.createErrorResult(error))
        }

    })
})

module.exports = router