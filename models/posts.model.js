const mongoose = require('mongoose');
const postsSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'User未填寫']
    },
    replies: {
      type: mongoose.Schema.ObjectId,
      ref: 'Replies',
      required: [false, '']
    },
    tags: [
      {
        type: String,
        required: [true, '貼文標籤 tags 未填寫']
      }
    ],
    type: {
      type: String,
      enum:['group','person'],
      required: [true, '貼文類型 type 未填寫']
    },
    image: {
      type: String,
      default: ""
    },  
    content: {
      type: String,
      required: [true, 'Content 未填寫'],
    },
    likes: {
      type: Number,
      default: 0
    },
    comments:{
      type: Number,
      default: 0
    },
  },{
    versionKey: false,
    timestamps:true
  });
  
  const postsModel = mongoose.model('Post',postsSchema);
  
  module.exports = postsModel;