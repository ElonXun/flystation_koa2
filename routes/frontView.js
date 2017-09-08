const router = require('koa-router')();
const IndexController=require('../controller/frontView/index');





router.get('/api/query',IndexController.query)
      .post('/api/blogDetails',IndexController.blogDetails)








module.exports = router;