const Post = require('../models/Post')


class PostController {

    // @GET: post/
    async index(req, res, next) {
        try {
            const posts = await Post.find({ user: req.userId })
                .populate('user', ['username'])
            res.json({ success: true, posts})
        } catch (error) {
            console.log("Loi :", error)
            res.status(400).json({
                success: false,
                message: 'Internal server error',
            })
        }
    }

    // @Post: post/create
    async create(req, res, next) {
        const { title, description, slug, status } = req.body
        if (!title) {
            res.status(400).json({
                success: false,
                message: 'Title is required'
            })
        }

        try {
            const newPost = new Post({
                title,
                description,
                slug: slug.startsWith('http://') ? slug : `https://${slug}`,
                status: status || 'TO LEARN',
                user: req.userId,
            });



            await newPost.save()
            res.status(200).json({
                success: true,
                message: 'Post created successfully',
                post: newPost,
            })

        } catch (error) {
            console.log(error)
            res.status(400).json({
                success: false,
                message: 'Internal server error',
            })
        }


    }


    async update(req, res, next) {
        const { title, description, slug, status } = req.body

        if (!title) {
            res.status(400).json({
                success: false,
                message: 'Title is required'
            })
        }

        try {
            let updatedPost = {
                title,
                description,
                slug: slug.startsWith('http://') ? slug : `https://${slug}`,
                status: status || 'TO LEARN',
            }

            const postUpdateCondition = { _id: req.params.id, user: req.userId }

            updatedPost = await Post.findOneAndUpdate(postUpdateCondition, updatedPost, { new: true })
            if (!updatedPost)
                res.status(401).json({ success: false, message: 'Post not found or user not authorised' })

            res.json({ success: true, updatedPost, message: 'Update Successfully'})

        } catch (error) {
            console.log(error)
            res.status(400).json({
                success: false,
                message: 'Internal server error',
            })
        }
    }

    async delete(req, res, next) {
        try {
            const postUpdateCondition = { _id: req.params.id, user: req.userId }
            const deletedPost = await Post.findOneAndDelete(postUpdateCondition)
            if (!deletedPost)
                res.status(401).json({ success: false, message: 'Post not found or user not authorised' })

            res.json({ success: true, deletedPost })

        } catch (error) {
            console.log(error)
            res.status(400).json({
                success: false,
                message: 'Internal server error',
            })
        }
    }
}

module.exports = new PostController;