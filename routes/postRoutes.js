const express = require('express')

const postDb = require('../data/helpers/postDb')

const validatePost = require('../middlewares').validatePost

const router = express.Router()

router.get('/', async (req, res) => {
    try{
        let posts = await postDb.get()
        res.status(200).json(posts)
    }catch(err){
        res.status(500).json({message: 'internal server error'})
    }
})

router.get('/:id', async (req, res) => {
    try{
        let post = await postDb.getById(req.params.id)
        if(post){
            res.status(200).json(post)
        }else{
            res.status(404).json({message: 'post not found'})
        }
    }catch(err){
        res.status(500).json({message: 'internal server error'})
    }
})

router.post('/', validatePost, async (req, res) => {
    try{
        let newpost = await postDb.insert(req.body)
        res.status(201).json(newpost)
    }catch(err){
        res.status(500).json({message: 'internal server error'})
    }
})

router.put('/:id', validatePost, async (req, res) => {
    try{
        let count = await postDb.update(req.params.id, req.body)
        if(count){
            res.status(200).json({message: 'update successful'})
        }else{
            res.status(404).json({message: 'post not found'})
        }
    }catch(err){
        res.status(500).json({message: 'internal server error'})
    }
})

router.delete('/:id', async (req, res) => {
    try{
        let count = await postDb.remove(req.params.id)
        if(count > 0){
            res.status(200).json(count)
        }else{
            res.status(404).json({message: 'post not found'})
        }
    }catch(err){
        res.status(500).json({message: 'internal server error'})
    }
})

module.exports = router