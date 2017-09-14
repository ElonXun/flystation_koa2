const mongoose = require('mongoose');
const qiniu = require("qiniu");
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
      code:200,
      status: true,
      data:{
        wantuToken: "UPLOAD_AK_TOP " + wantuUtils.uploadAuth(uploadPolicy, AK, SK),
        "User-Agent": wantuUtils.getUserAgent(),
      }
    }



    return ctx.body = obj

  }

  //拿到千牛直传token
  static async getQiNiuToken(ctx){
    const AK = require('../../config/common').qiniuAK
    const SK = require('../../config/common').qiniuSK
    let mac = new qiniu.auth.digest.Mac(AK, SK)
    const bucket = require('../../config/common').bucket;
    const putPolicy = new qiniu.rs.PutPolicy({
      scope: bucket,
      returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}'
    });

    const uploadToken = putPolicy.uploadToken(mac);

    const obj = {
      code:200,
      status: true,
      data:{
        qiniuToken: uploadToken
      }
    }

    return ctx.body = obj

  }

}

module.exports = AdminController;