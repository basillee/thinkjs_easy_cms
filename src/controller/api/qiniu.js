const Base = require('../base.js');
const qiniu = require('qiniu');


module.exports = class extends Base {
  indexAction() {
    return this.display();
  }

  /**
   * http://127.0.0.1:8360/api/qiniu/getToken
   */
  async getTokenAction() {
    console.log('callbackAction.....');
    var config_qiniu = this.config('qiniu');
    var bucket = config_qiniu.bucket;
    var accessKey =config_qiniu.access_key;
    var secretKey = config_qiniu.secret_key;
    var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

    var options = {
      scope: bucket,
      // returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}',
      // callbackUrl: 'http://127.0.0.1:8360/api/qiniu/callback',
      // callbackBody: 'key=$(key)&hash=$(etag)&bucket=$(bucket)&fsize=$(fsize)&name=$(x:name)',
      // callbackBodyType: 'application/json'
    };
    var putPolicy = new qiniu.rs.PutPolicy(options);
    var uploadToken = putPolicy.uploadToken(mac);
    var obj = new Object();
    obj.uptoken = uploadToken;
    return this.ctx.json(obj);
  }

  async callbackAction() {
    console.log('callbackAction.....');
    return 'callback';
  }
};