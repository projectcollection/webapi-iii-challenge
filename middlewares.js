const userDb = require('./data/helpers/userDb')
const postDb = require('./data/helpers/postDb')

// User middlewares
/**
 * cancels request when no name found in body
 * else, it turns name to uppercase
 */
const nameToUpperCase = (req, res, next) => {
    const {name} = req.body
    if(name){
        req.body.name = turnUppercase(name)
        next()
    }else{
        res.status(400).json({message: 'need a name for ya boi'})
    }
}

/**
 * delete all user posts before deleting user
 */
const deleteUserPosts = async (req, res, next) => {
    let posts = await userDb.getUserPosts(req.params.id)
    posts.forEach(async post => {
       await postDb.remove(post.id) 
    });

    next()
}

// Helpers ? 
const turnUppercase = (string) => {
    let stringAsArr = string.split('')
    return stringAsArr.map((char, idx) => {
        if(idx === 0 || stringAsArr[idx-1] === ' '){
            return char.toUpperCase()
        }else{
            return char
        }
    }).join('')
}

// Post middlewares

/**
 * check if provided post data is valid
 */
const validatePost = async (req, res, next) => {
    const {user_id, text} = req.body
    if(user_id && text){
        try{
            let user = await userDb.getById(user_id)
            if(user){
                next()
            }else{
                res.status(404).json({message: 'user not found'})
            }
        }catch(err){
            res.status(500).json({messsage: 'try again later'})
        }
    }else{
        res.status(400).json({message: 'make a better request'})
    }
}

module.exports = {
    nameToUpperCase,
    deleteUserPosts,
    validatePost,
}