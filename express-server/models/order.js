const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product",
        require:true
    },
    isPaid:Boolean
})

module.exports = mongoose.model('order', orderSchema)