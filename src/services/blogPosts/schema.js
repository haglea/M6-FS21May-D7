import mongoose from 'mongoose'

const {Schema, model} = mongoose

const blogPostSchema = new Schema({
  category: { type: String, required: true},
  title: { type: String, required: true},
  cover: { type: String, required: true},
  readTime: {
      value: { type: Number, min: 1, max: 65, required: true },
      unit: { type: String, required: true }
  },
  author: {
      name: { type: String, required: true },
      avatar: { type: String, required: true } 
  },
  content: { type: String, required: true }
}, { 
  timestamps: true // adds createdAt and updatedAt automatically
})


export default model("BlogPost", blogPostSchema) // bounded to the "users" collection, if it is not there it is going to be created automatically