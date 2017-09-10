const router = require('koa-router')();
const IndexController=require('../controller/frontView/index');





router.get('/api/query',IndexController.query)
      .post('/api/blogDetails',IndexController.blogDetails)
      .get('/api/getBlogTapes',)







module.exports = router;