const mongoose = require('mongoose');
const Addtocart = new mongoose.Schema({
    userid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        require: true
    },
    productid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        require: true
    },
    quantity:{
        type:String, 
        require:true,   
    },
    regdate:{
        type:Date,
        default:()=>Date.now(),
   }
});

module.exports = mongoose.model('addtocart', Addtocart);