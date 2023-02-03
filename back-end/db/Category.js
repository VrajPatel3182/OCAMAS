const mongoose = require('mongoose');
const categoryschema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    }
});

module.exports = mongoose.model("category",categoryschema);