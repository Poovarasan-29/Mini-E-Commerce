const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const multer = require('multer');

const connectDatabase = require('./config/connectDatabase');
dotenv.config({ path: path.join(__dirname, 'config', 'config.env') })


const products = require('./routes/product');
const orders = require('./routes/order');
const addToCart = require('./routes/cart');

// call the database connection 
connectDatabase();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('./public'));
app.use('/api/v1/', products);
app.use('/api/v1/', orders);
app.use('/api/v1/', addToCart);




app.listen(process.env.PORT, () => {
    console.log(`Server Running to Port ${process.env.PORT}`);
})