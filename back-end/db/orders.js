const mongoose = require('mongoose');
const productschema = new mongoose.Schema({
    ord_cust_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true,
    },
    ord_prod_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        require:true,
    },
    ord_quantity:{
        type:Number,
        require:true,
    },
    ord_price:{
        type:Number,
        require:true,
    },
    ord_status:{
        type:String,
        require:true,
    },
    ord_date:{
         type:Date,
         default:()=>Date.now(),
    }
});

module.exports = mongoose.model("orders",productschema);