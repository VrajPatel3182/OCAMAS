const mongoose = require('mongoose');
const Category = require('./Category');
const productschema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    description:{
        type:String,
        require:true,
    },
    price:{
        type:Number,
        require:true,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'category',
        require:true,
    },
    subcategory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'subcategory',
        require:true,
    },
    discount:{
        type:Number,
    },
    stock:{
        type:Number,
    },
    company:{
        type:String,
        require: true,
    },
    picture:{
        type:String,
        require:true,
    },
    adddate:{
         type:Date,
         default:()=>Date.now(),
    }
});

module.exports = mongoose.model("products",productschema);