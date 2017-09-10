const mongoose = require('mongoose')
const wantuUtils =require('../../utils/wantu');

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

    const obj = {
      success: true,
      Authorization: "UPLOAD_AK_TOP " + wantuUtils.uploadAuth(uploadPolicy, AK, SK),
      "User-Agent": wantuUtils.getUserAgent(),
    }



    return ctx.body = obj

  }

}

module.exports = AdminController;