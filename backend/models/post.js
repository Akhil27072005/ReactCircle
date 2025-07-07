const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    caption:{
        type:String,
        trim:true
    },
    description:{
        type:String,
    },
    imageURL:{
        type:String,
        default:''
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    author:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  likes:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments:[{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    text: {
        type: String,
        required: true
    },
    timeStamp: {
        type: Date,
        default: Date.now
    }
  }]
});


module.exports = mongoose.model('Post', postSchema);