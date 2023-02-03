var express = require('express')
var router = express.Router()
var pool = require('./db')

router.get('/api/get-statuses', async (req, res) => {
    pool.query(`SELECT * FROM status`, (err, data) => {
        if (err) return next(err)
        res.json(data.rows)
    })
})

// Boat REST routes

router.get('/api/get-boats', async (req, res) => {
    pool.query(`SELECT * FROM boats`, (err, data) => {
        if (err) return next(err)
        res.json(data.rows)
    })
})

router.get('/api/get-a-boat', async (req, res) => {
    const { id } = req.body
    pool.query(`SELECT * FROM boats WHERE id = $1`, [id], (err, data) => {
        if (err) return next(err)
        res.json(data.rows)
    })
})

router.post('/api/create-boat', async (req, res) => {
    const { name, status_id } = req.body
    pool.query(
        `INSERT INTO boats(name, status_id)
        VALUES($1, $2)`,
        [name, status_id],
        (err, data) => {
            if (err) return next(err)
            res.json(data.rows)
        },
    )
})

router.put('/api/update-boat', async (req, res) => {
    const { id, status_id } = req.body
    pool.query(
        `UPDATE boats SET status_id = $1
            WHERE id = $2`,
        [status_id, id],
        (err, data) => {
            if (err) return next(err)
            res.json(data.rows)
        },
    )
})

router.delete('/api/delete-boat', async (req, res) => {
    const { id } = req.body
    pool.query(`DELETE FROM boats WHERE id = $1`, [id], (err, data) => {
        if (err) return next(err)
        res.json(data.rows)
    })
})

module.exports = router
