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
        res.status(400).json({message: 'ne'})
    }
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




module.exports = {
    nameToUpperCase,
}