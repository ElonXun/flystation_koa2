const mongoose = require('mongoose')

class AdminController {

  //拿到玩图长传token
  static async getWantuToken(ctx){
    const AK = require('../../config/common').AK
    console.log(AK)
    const SK = require('../../config/common').SK
    const namespace = require('../../config/common').namespace

    const expiration = Date.now() + (1*3600*1000);

    const uploadPolicy = {
      namespace: namespace,
      expiration: expiration,
      insertOnly: 0,
    }

    

    return ctx.body = {
      code:'200'
    }


// //得到上传Token  有限期限为1小时
//     exports.getToken = function(req,res,next){
//       // console.log('in wentu')
//       // console.log(req.user)
//       const obj = {
//         success: true,
//         Authorization: "UPLOAD_AK_TOP " + wantuUtils.uploadAuth(uploadPolicy, AK, SK),
//         "User-Agent": wantuUtils.getUserAgent(),
//       }
//
//       res.json(obj)
//     }
  }

}

module.exports = AdminController;