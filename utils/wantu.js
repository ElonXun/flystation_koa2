var CryptoJS = require("crypto-js");
var utils = {};

utils.base64 = function (str) {
  return new Buffer(str).toString('base64');
};

utils.getUserAgent = function (type) {
  if (type == "TOP") {
    return "ALIMEDIASDK_NODEJS_TAE";
  } else {
    return "ALIMEDIASDK_NODEJS_CLOUD";
  }
};

utils.uploadAuth = function (uploadPolicy, AK, SK) {
  var encodedPolicy = this.URLSafeBase64(JSON.stringify(uploadPolicy)),
      sign = CryptoJS.HmacSHA1(encodedPolicy, SK);
  return this.URLSafeBase64(AK + ":" + encodedPolicy + ":" + sign);
};

utils.URLSafeBase64 = function (str) {
  return new Buffer(str).toString('base64')
      .replace(/\+/g, '-') // Convert '+' to '-'
      .replace(/\//g, '_') // Convert '/' to '_'
      .replace(/=+$/, ''); // Remove ending '=';
};

utils.manageAuth = function (path, query, body, date, SK, AK) {
  var stringBeforeSign;
  if (query) {
    stringBeforeSign = path + '?' + query + "\n" + body + "\n" + date;
  } else {
    stringBeforeSign = path + "\n" + body + "\n" + date;
  }
  var sign = CryptoJS.HmacSHA1(stringBeforeSign, SK);
  var preencode = AK + ":" + sign;
  return this.URLSafeBase64(preencode);
};

module.exports = exports.utils = utils;



