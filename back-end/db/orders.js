const mongoose = require('mongoose');
const productschema = new mongoose.Schema(
    {
    products: [
        {
          type:mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
      ],
      payment: {},
      buyer: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
      status: {
        type: String,
        default: "Not Process",
        enum: ["Not Process", "Processing", "Shipped", "deliverd", "cancel"],
      },
    },{ timestamps: true }

);


module.exports = mongoose.model("orders",productschema);

    // ord_cust_id:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:'User',
    //     require:true,
    // },
    // ord_prod_id:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:'Product',
    //     require:true,
    // },
    // ord_quantity:{
    //     type:Number,
    //     require:true,
    // },
    // ord_price:{
    //     type:Number,
    //     require:true,
    // },
    // ord_status:{
    //     type:String,
    //     require:true,
    // },
    // ord_date:{
    //      type:Date,
    //      default:()=>Date.now(),
    // }