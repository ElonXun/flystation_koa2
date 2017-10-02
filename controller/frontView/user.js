const mongoose = require('mongoose');
const User = require('../../models/user');

class UserController {
  //创建一个操作账户
  static async addAccount(ctx){
      console.log('addAccount')
      const data = ctx.request.body
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
}


module.exports = UserController;