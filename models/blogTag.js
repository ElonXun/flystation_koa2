const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const BlogTagSchema = new Schema({
   tagContent:{type:String , required:true},
})

module.exports = mongoose.model('BlogTag', BlogTagSchema);