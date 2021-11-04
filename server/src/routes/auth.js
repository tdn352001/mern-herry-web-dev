const express = require('express')
const router = express.Router();
const authController = require('../app/controllers/authController')
const verifyToken = require('../app/middleware/auth')


/* ====== Navigate ====== */


// @POST:  auth/register
router.post('/register', authController.register)

// @POST:  auth/register
router.post('/login', authController.login)

// @GET: auth/
router.get('/', verifyToken, authController.index);


module.exports = router