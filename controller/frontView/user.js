const mongoose = require('mongoose');
const User = require('../../models/user');
const uuidv4 = require('uuid/v4');


class UserController {
  //创建一个操作账户
  static async addAccount(ctx){
      console.log('addAccount')
      const data = ctx.request.body
      data.token = uuidv4()
      console.log(data)
      const result = await User.create(data)
      if(!result){
        return ctx.body = {
          code:400,
          status:'fail',
        }
      }

      return ctx.body = {
        code:200,
        status:'success',
        // date:result,
      }

  }

  //验证账号
  static async verifyAccount(ctx){
      console.log('verifyAccount')
      const data = ctx.request.body
      console.log(data)
      const result = await User.findOne({userName:data.userName,passWord:data.passWord}).exec()
      if(!result){
        return ctx.body = {
          code:400,
          status:'fail',
        }
      }

      return ctx.body = {
        code:200,
        status:'success',
        date:{
          token:result.token
        },
      }

  }

}


module.exports = UserController;