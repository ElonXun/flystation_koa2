const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  blogTitle: { type:String , required:true },
  blogContent: {type:String , required:true },
  blogPicture: {type:String ,required:true},
  blogTape:{type:Number, required:true}, //0为干货,1为杂记,2为游记
  blogReview:{type:Number,default:0},
  isTop:{type:Number,default:0},
  blogTagIds:{type:String,required:true},
  createAt: {
    type: Date,
    default: Date.now()
  },
  updateAt: {
    type: Date,
    default: Date.now()
  },
});

BlogSchema.pre('save', function(next){
  if(this.isNew) {
    this.createAt = this.updateAt = Date.now()
  }else {
    this.updateAt = Date.now()
  }
  next()
});

module.exports = mongoose.model('Blog', BlogSchema);


