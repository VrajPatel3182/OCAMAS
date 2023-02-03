const mongoose = require('mongoose');
const SubCategory = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        require: true
    }
});

module.exports = mongoose.model('subcategory', SubCategory);