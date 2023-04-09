const mongoose = require('mongoose');
const userschema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String, 
        require:true,   
    },
    password:{
        type:String,
        require:true    
    },
    country:{
        type:String,
        require:true    
    },
    state:{
        type:String,
        require:true    
    },
    city:{
        type:String,
        require:true    
    },
    address:{
        type:String,
        require:true    
    },
    gender:{
        type:String,
        require:true,
    },
    contact:{
        type:Number,
        require:true
    },
    profile:{
        type:String,
        require:true
    },
    usertype:{
        type:Number,
        require:true,
        default:1
    },
    status:{
        type:Number,
        require:true,
        default:1 //if number is 1 then it is active user else it is deactive.
    },
    regdate:{
        type:Date,
        default:()=>Date.now(),
   }

});
    

module.exports = mongoose.model("users",userschema);

// const mongoose = require('mongoose');
// const userschema = new mongoose.Schema({
//     name:String,
//     email:String,
//     password:String
// });

// module.exports = mongoose.model("users",userschema);