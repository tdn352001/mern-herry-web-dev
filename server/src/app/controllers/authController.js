const User = require('../models/User')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const { ACCESS_TOKEN} = require('../../config/constants')

class AuthController{
    
    // @GET: /auth
    async index(req, res, next) {
        console.log("Lọt vào next")
        try {
            const user = await User.findById(req.userId).select('-password')
            if (!user) {
                console.log("Không có user")
                res.status(400).json({
                    success: false,
                    message: 'User not found',
                })
            } else {
                console.log(user)
                res.status(200).json({
                    success: true,
                    user
                })
            }
        } catch (error) {
            console.log(error)
            res.status(400).json({
                success: false,
                message: 'Internal server error',
            })
        }
    }

    // @POST: /auth/register
    async register(req, res, next){
        const {username, password} = req.body

        if(!username || !password){
            return res.status(401).json({
                success: false, 
                message: `Missing username or password ${username} ${password}`,
            })
        }

        try{
            const user = await User.findOne({username})
            if(user){
                return res.status(400).json({
                    success: false,
                    message: 'Username already exists',
                })
            }

            const hashedPassword = await argon2.hash(password)
            const newUser = new User({
                username, 
                password: hashedPassword})
            await newUser.save(); 
            
            const accessToken = jwt.sign({ userId: newUser._id }, process.env.ACCESS_TOKEN)
            return res.json({
                success: true,
                message: 'Register Successfully',
                accessToken
            })
        }
        catch(error){
            console.log(error)
            res.status(400).json({
                success: false,
                message: 'Internal server error',
            })
        }

    }

    async login(req, res, next) {
        const { username, password } = req.body

        if (!username || !password) {
            return res.status(401).json({
                success: false,
                message: `Missing username or password`,
            })
        }

        try {
            const user = await User.findOne({ username })
            if (user) {
                const passwrodValid = await argon2.verify(user.password, password);
                if (passwrodValid) {
                    const accessToken = jwt.sign({ userId: user._id }, ACCESS_TOKEN)
                    return res.status(200).json({
                        success: true,
                        message: 'Login Successfully',
                        accessToken
                    })
                }
            }

            return res.status(401).json({
                success: false,
                message: 'Incorrect username or password',
            })
        } catch (error) {
            console.log(error)
            res.status(400).json({
                success: false,
                message: 'Internal server error',
            })
        }
        
    }
}


module.exports = new AuthController;