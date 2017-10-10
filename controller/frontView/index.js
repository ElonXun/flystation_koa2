const mongoose = require('mongoose')
const Blog = require('../../models/blog')

class IndexController {

  // 首页数据加载
  static async query(ctx){
    console.log('query')

    const result = await Blog.find({},['blogTitle','blogPicture','blogTape','blogReview','isTop','createAt','updateAt']).exec()

    if(!result){
      return ctx.body = { code: 400, status:'fail'};
    }


    return ctx.body = { code: 200, status:'success',data:{ blogs:result}};
  }

  //查询博客详情
  static  async blogDetails(ctx){
    console.log('blogDetails')
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


  //修改博客信息
  static  async saveBlogDetails(ctx){
    console.log('saveBlogDetails')
    const blogId = ctx.request.body.blogId

    if(!blogId){
      return ctx.body = { code: 401, status:'fail', err:'no blogId'};
    }

    const data = ctx.request.body.data

    const result = await Blog.findByIdAndUpdate(blogId,data)

    console.log(result)

    if(!result){
      return ctx.body = { code: 400, status:'fail'};
    }

    return ctx.body = { code: 200, status:'success'};
  }

  //博客点击量
  static  async addBlogReview(ctx){
    console.log('addBlogReview',ctx.query)
    const blogId = ctx.query.blogId

    if(!blogId){
      return ctx.body = { code: 401, status:'fail', err:'no blogId'};
    }


    const result = await Blog.findByIdAndUpdate(blogId,{$inc : {blogReview : 1}})

    console.log(result)

    if(!result){
      return ctx.body = { code: 400, status:'fail'};
    }

    return ctx.body = { code: 200, status:'success'};
  }



}

module.exports = IndexController;
