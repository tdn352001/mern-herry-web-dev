const express = require('express');
const db = require('./config/db/index')
const routes = require('./routes')
const cors = require('cors')
const app = express();
const port = process.env.PORT || 5000;



app.use(express.urlencoded({
    extended: true
}))

// Để app đọc được json gửi lên
app.use(express.json())

// để front end từ local host lấy api được
app.use(cors())

//connect db
db.connect();

//navigation
routes(app);

//connect server
app.listen(port);