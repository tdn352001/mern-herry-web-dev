const jwt = require('jsonwebtoken')
const constants = require('../../config/constants')

const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.split(' ')[1]
    if(token){
        try {
            const decoded = jwt.verify(token, constants.ACCESS_TOKEN)
            req.userId = decoded.userId
            next()
        } catch (error) {
            console.log(" LỖI: ", error)
            res.status(403).json({
                success: false,
                message: 'Invalid Token'
            })
        }

    }else{
        res.status(401).json({
            success: false,
            message: 'Access token not found'
        })
    }
}

module.exports = verifyToken