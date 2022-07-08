const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    products:[
        {
            product: {
                type:mongoose.Schema.Types.ObjectId,
                ref:"product",
                require:true
            },
            quantity: Number,
        }
    ],
    email:String,
    receiver:String,
    isPaid:Boolean,
    price: Number
})

module.exports = mongoose.model('order', orderSchema)