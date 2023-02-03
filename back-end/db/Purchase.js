
const mongoose = require('mongoose');
const productschema = new mongoose.Schema({
    purchase_prod_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'product',
        require:true,
    },
    purchase_quantity:{
        type:Number,
        require:true,
    },
    purchase_cost_price:{
        type:Number,
        require:true,
    },
    
    purchase_total:{
        type:Number,
        require:true,
    },
   
    purchasedate:{
         type:Date,
         default:()=>Date.now(),
    }
});

module.exports = mongoose.model("Purchases",productschema);

