// ----------------------------- blogPosts + blogPosts comments CRUD ---------------------
import express from "express"
import blogPostModel from './schema.js'

const blogPostsRouter = express.Router()

blogPostsRouter.get("/", async (request, response, next) => {
    try {
        const blogPosts = await blogPostModel.find({})       
        response.send(blogPosts);  
    } catch (error) {
        next(error)
    }    
})

blogPostsRouter.get("/:blogPostId", async (request, response, next) => {
    try {       
    const blogPostId = request.params.blogPostId
    const blogPost = await blogPostModel.findById(blogPostId)
    response.send(blogPost)
    } catch (error) {
        next(error)
    }
})

blogPostsRouter.post("/", async (request, response, next) => {
    try {      
    const newBlogPost = new blogPostModel(request.body) // here happens validation of the req.body, if it's not ok mongoose will throw a "ValidationError"
    const {_id} = await newBlogPost.save()   

    response.status(201).send({ _id })
    
    } catch (error) {
        next(error)
  }
})

blogPostsRouter.put("/:blogPostId", async (request, response, next) => {
    try {       
        const blogPostId = request.params.blogPostId
        const updatedBlogPost = await blogPostModel.findByIdAndUpdate(blogPostId, request.body, {
            new: true // returns the updated blogPost
        })
    
    response.send(updatedBlogPost)
    } catch (error) {
        next(error)
    }
})

blogPostsRouter.delete("/:blogPostId", async (request, response, next) => {
    try {       
        const blogPostId = request.params.blogPostId
        const deletedBlogPost = await blogPostModel.findByIdAndDelete(blogPostId)

    response.status(204).send(deletedBlogPost)
    } catch (error) {
        next(error)
    }
})


export default blogPostsRouter