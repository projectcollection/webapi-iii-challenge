const express = require('express')

const userDb = require('../data/helpers/userDb')
const nameToUpperCase = require('../middlewares').nameToUpperCase
const deleteUserPosts = require('../middlewares').deleteUserPosts

const router = express.Router()

router.get('/', async (req, res) => {
    try{
        let users = await userDb.get()
        res.status(200).json(users)
    }catch(err){
        res.status(500).json({message: 'internal server error'})
    }
})

router.get('/:id', async (req, res) => {
    try{
        let user = await userDb.getById(req.params.id)
        if(user){
            res.status(200).json(user)
        }else{
            res.status(404).json({message: 'user not found'})
        }
    }catch(err){
        res.status(500).json({message: 'internal server error'})
    }
})

router.post('/', nameToUpperCase, async (req, res) => {
    try{
        let newUser = await userDb.insert(req.body)
        res.status(201).json(newUser)
    }catch(err){
        res.status(500).json({message: 'internal server error'})
    }
})

router.put('/:id', nameToUpperCase, async (req, res) => {
    try{
        let count = await userDb.update(req.params.id, req.body)
        if(count){
            res.status(200).json({message: 'update successful'})
        }else{
            res.status(404).json({message: 'user not found'})
        }
    }catch(err){
        res.status(500).json({message: 'internal server error'})
    }
})

router.delete('/:id', deleteUserPosts, async (req, res) => {
    try{
        let count = await userDb.remove(req.params.id)
        if(count > 0){
            res.status(200).json(count)
        }else{
            res.status(404).json({message: 'user not found'})
        }
    }catch(err){
        console.log(err)
        res.status(500).json({message: 'internal server error'})
    }
})

module.exports = router