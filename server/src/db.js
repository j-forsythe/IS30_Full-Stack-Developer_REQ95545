const { Pool } = require('pg')

const pool = new Pool({
    user: 'jillforsythe',
    host: 'localhost',
    database: 'ecotours',
    password: '',
    post: 5432,
})

module.exports = pool
