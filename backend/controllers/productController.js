const productModel = require('../models/productModel');
const multer = require('multer');

// Get Products API - http://localhost:8000/api/v1/products
exports.getProducts = async (req, res) => {
    const query = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {};
    const products = await productModel.find(query);

    res.json({
        success: true,
        products
    })

}


// Get Single Product API - /api/v1/product/:id
exports.getSingleProduct = async (req, res) => {

    try {
        const product = await productModel.findById(req.params.id);
        // Can use this Option
        // const product = await productModel.find({ _id: req.params.id });
        res.json({
            success: true,
            product
        })

    } catch (error) {
        res.status(404).json({
            success: false,
            // message: error.message
            message: 'unable to get Product with that ID'
        })
    }
}


exports.deleteProduct = async (req, res) => {
    await productModel.deleteOne({ _id: req.params.id });
    const products = await productModel.find({});
    res.json({
        products
    })
}


// Upload images using Multer

let imgPaths = []
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../frontend/public/images/products');
    },
    filename: (req, file, cb) => {
        imgPaths = []
        const nowDate = new Date();
        const date = nowDate.getDate() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getFullYear() + '_' + nowDate.getHours() + '-' + nowDate.getMinutes() + '-' + nowDate.getSeconds();
        imgPaths.shift();
        const path = { image: '/images/products/' + date + '_' + file.originalname }
        imgPaths.push(path);
        cb(null, date + '_' + file.originalname);
    }
});

const upload = multer({
    storage,
    limits: {
        fileSize: (2 * 1000 * 1000)
    }
});

// const uploadHandler = upload.array('file');
const uploadHandler = upload.fields([{ name: 'file', maxCount: 5 }, { name: 'category' }])

exports.addProduct = (req, res) => {

    uploadHandler(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            if (err.code == 'LIMIT_FILE_SIZE') {
                res.status(400).json({ message: "Maximum size 2MB" })
            }
            return;
        }
        else {
            const values = req.body;
            await productModel.create({ name: values.name, price: values.price, description: values.description, ratings: 0, category: values.category, stock: values.stock, discount: values.discount, images: imgPaths });
            res.status(200).json({ message: 'Uploaded to The Server !!' })
        }
    });
}
