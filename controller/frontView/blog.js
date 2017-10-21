const mongoose = require('mongoose')
const BlogTag = require('../../models/blogTag')



class BlogController {
 
 static  async getBlogTags(ctx){
    console.log('getBlogTags')
    const blogId = ctx.request.body.blogId

    if(!blogId){
      return ctx.body = { code: 401, status:'fail', err:'no blogId'};
    }

    const result = await Blog.findById(blogId).exec()

    if(!result){
      return ctx.body = { code: 400, status:'fail'};
    }

    return ctx.body = { code: 200, status:'success',data:{ blogDetails:result}};

  }
 
}

module.exports =  BlogController;