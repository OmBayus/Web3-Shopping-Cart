const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:String,
    price:Number,
    img:String,
    description:String,
})

module.exports = mongoose.model('product', productSchema)