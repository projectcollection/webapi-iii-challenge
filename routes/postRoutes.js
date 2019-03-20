const express = require('express')

const postDb = require('../data/helpers/postDb')

const router = express.Router()

router.get('/', (req, res) => {
    res.send('working')
})
router.get('/:id', (req, res) => {

})
router.post('/', (req, res) => {

})
router.put('/:id', (req, res) => {

})
router.delete('/:id', (req, res) => {

})

module.exports = router