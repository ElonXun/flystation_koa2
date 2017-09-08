require("babel-register");
require("babel-polyfill");          //引入这个文件babel-polyfill很重要，否则出现错误
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa2-cors');
const frontRoute = require('./routes/frontView')
const route = require('./routes/index')
const mongoose = require('mongoose');

/**
 *  const db = 'mongodb://youraccount:yourpassword@localhost:27017/yourMongoDb'
 * @type {string}
 */
const db = require('./config/common')
//mongose
mongoose.Promise = require('bluebird');

mongoose.connect(db,{useMongoClient:true});
require('./models/blog');



// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

//cors
app.use(cors())

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.use(route.routes(), route.allowedMethods())
// routes
app.use(frontRoute.routes(), frontRoute.allowedMethods())

module.exports = app
