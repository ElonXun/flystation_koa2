const mongoose = require('mongoose')
const Blog = require('../../models/blog')
const BlogTag =require('../../models/blogTag')
const moment =require ('moment')


class IndexController {

  // 首页数据加载
  static async query(ctx){
    console.log('query')

    const result = await Blog.find({},['blogTitle','blogPicture','blogTape','blogReview','isTop','createAt','updateAt']).exec()
    
    result.sort((a,b)=>{
       if(a.isTop<b.isTop){
        return 1
       }else if(a.isTop==b.isTop){
          if(moment(a.createAt).format('X')<moment(b.createAt).format('X')){
            return -1
          }else if(moment(a.createAt).format('X')==moment(b.createAt).format('X')){
            return 0
          }else{
            return 1
          }
       }else{
        return -1
       }
    })

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
    
    // console.log(ctx.request.body.data.blogTags)
    // return ctx.body = { code: 401, status:'text'};

    const data = ctx.request.body.data
    
    let newTags = data.blogTags.filter((tag,index)=>{
      return tag.tagStatus === 1
    })
    console.log('newTags',newTags)
    let oldTags = data.blogTags.filter((tag,index)=>{
      return tag.tagStatus === 0
    })
    console.log('oldTags',oldTags)
    // return ctx.body = { code: 401, status:'text'};
    
    let newTagIds = []
    newTags.forEach(async(tag,index)=>{
       let result = await BlogTag.create({tagContent:tag.tagName})
       console.log('in result',result)
       newTagIds.push(result._id)
    })

    console.log('newTagIds',newTagIds)

    let oldTagIds = oldTags.map((tag,index)=>{
       return tag.tagId
    })

    data.blogTags=oldTagIds.concat(newTagIds)
    console.log('blogTags',data.blogTags)

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

  //右侧导航栏阅读最多
  static  async mostReviewedBlogs(ctx){
    console.log('mostReviewedBlogs')

    const result = await Blog.find({},['blogReview','blogTitle']).sort({blogReview:-1}).limit(3)

    console.log(result)

    if(!result){
      return ctx.body = { code: 400, status:'fail'};
    }

    return ctx.body = { code: 200, status:'success'};
  }

  //置顶文章
  static  async setBlogTop(ctx){
    console.log('setBlogTop',ctx.request.body.blogId,ctx.request.body.isTop)
    const blogId = ctx.request.body.blogId

    if(!blogId){
      return ctx.body = { code: 401, status:'fail', err:'no blogId'};
    }

    const isTop = ctx.request.body.isTop

    const result = await Blog.findByIdAndUpdate(blogId,{isTop:isTop}).exec()

    console.log(result)

    if(!result){
      return ctx.body = { code: 400, status:'fail'};
    }

    return ctx.body = { code: 200, status:'success'};
  }



}

module.exports = IndexController;
