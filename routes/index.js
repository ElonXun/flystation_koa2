const router = require('koa-router')()
const mongoose = require('mongoose')
const Blog = require('../models/blog');
const AdminController = require('../controller/frontView/admin');


router.get('/test/getToken', AdminController.getWantuToken)

router.post('/test/saveBlog', async (ctx, next) => {
  const data = ctx.request.body
  console.log(data)

  // var blog = new Blog({
  //   blogTitle:data.blogTitle,
  //   blogContent:data.blogContent,
  //   blogPicture:data.blogPicture,
  //   blogTape:data.blogTape,
  // })

  // try {
  //   blog = await blog.save()
  // }catch (e){
  //   console.log(e)
  //   return ctx.body = {
  //     code:400,
  //     status:'fail',
  //   }
  // }

  const result = await Blog.create(data)
  if(!result){
    return ctx.body = {
      code:400,
      status:'fail',
    }
  }

  return ctx.body = {
    code:200,
    status:'success',
    date:result,
  }
})
module.exports = router
