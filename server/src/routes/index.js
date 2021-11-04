
const authRouter = require("./auth");
const postRouter = require("./post");

function route(app) {
    
    app.use('/auth', authRouter)
    app.use('/post', postRouter)

    app.get('/', (req, res) => {
        res.send('Hello World')
    })    
}

module.exports = route;
