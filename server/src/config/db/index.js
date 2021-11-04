const mongoose = require('mongoose')
const { dbUsername, dbPassword} = require('../constants')

async function connect() {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.tsxhi.mongodb.net/mean_learning?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('connected')
    } catch (error) {
        console.log('connect Failed')
        console.log(error)
    }
}


module.exports = { connect }