var express = require('express')
var router = express.Router()
var pool = require('./db')

router.get('/api/get-statuses', async (req, res, next) => {
    pool.query(`SELECT * FROM public.status`, (err, data) => {
        if (err) return next(err)
        res.json(data.rows)
    })
})

// Boat REST routes

router.get('/api/get-boats', async (req, res, next) => {
    pool.query(`SELECT * FROM public.boats`, (err, data) => {
        if (err) return next(err)
        res.json(data.rows)
    })
})

router.get('/api/get-a-boat', async (req, res, next) => {
    const { id } = req.body
    pool.query(
        `SELECT * FROM public.boats WHERE id = $1`,
        [id],
        (err, data) => {
            if (err) return next(err)
            res.json(data.rows)
        },
    )
})

router.post('/api/create-boat', async (req, res, next) => {
    const { name } = req.body
    // get first status id for default new boat status
    const { rows: status } = await pool.query(`select id from status limit 1;`)
    await pool.query(
        `INSERT INTO public.boats(name, status_id)
        VALUES($1, $2) RETURNING *`,
        [name, status[0].id],
        (err, data) => {
            if (err) return next(err)
            res.json(data.rows)
        },
    )
})

router.put('/api/update-boat', async (req, res, next) => {
    const { id, status_id } = req.body
    pool.query(
        `UPDATE public.boats SET status_id = $1
            WHERE id = $2`,
        [status_id, id],
        (err, data) => {
            if (err) return next(err)
            res.json(data.rows)
        },
    )
})

router.delete('/api/delete-boat', async (req, res, next) => {
    const { id } = req.body
    pool.query(`DELETE FROM public.boats WHERE id = $1`, [id], (err, data) => {
        if (err) return next(err)
        res.json(data.rows)
    })
})

module.exports = router
