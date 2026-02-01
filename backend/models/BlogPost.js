const mongoose = require ("mongoose")

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
},
  { _id: false }
)



const BlogPostSchema = new mongoose.Schema
({
     title: { 
        type: String, 
        required: true },
     subtitle: { 
        type: String },
     content: { 
        type: String, 
        required: true },
     imageUrl: { 
        type: String },
     author: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' },
         likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    comments: [commentSchema],
  },
      { timestamps: true }
)



   
module.exports = mongoose.model("BlogPost", BlogPostSchema)