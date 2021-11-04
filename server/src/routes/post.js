const express = require('express')
const router = express.Router()
const postController = require('../app/controllers/postController')
const verifyToken = require('../app/middleware/auth')



// @POST: post/create
// @Access: private
router.post('/create', verifyToken, postController.create)

// @PUT: post/create
// @Access: private
router.put('/:id', verifyToken, postController.update)

// @PUT: post/create
// @Access: private
router.delete('/:id', verifyToken, postController.delete)

// @GET: post/
// @Access: private
router.get('/', verifyToken, postController.index)


module.exports = router