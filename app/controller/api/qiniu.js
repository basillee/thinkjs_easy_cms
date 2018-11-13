function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Base = require('../base.js');
const qiniu = require('qiniu');

module.exports = class extends Base {
  indexAction() {
    return this.display();
  }

  /**
   * http://127.0.0.1:8360/api/qiniu/getToken
   */
  getTokenAction() {
    var _this = this;

    return _asyncToGenerator(function* () {
      console.log('callbackAction.....');
      var config_qiniu = _this.config('qiniu');
      var bucket = config_qiniu.bucket;
      var accessKey = config_qiniu.access_key;
      var secretKey = config_qiniu.secret_key;
      var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

      var options = {
        scope: bucket
        // returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}',
        // callbackUrl: 'http://127.0.0.1:8360/api/qiniu/callback',
        // callbackBody: 'key=$(key)&hash=$(etag)&bucket=$(bucket)&fsize=$(fsize)&name=$(x:name)',
        // callbackBodyType: 'application/json'
      };
      var putPolicy = new qiniu.rs.PutPolicy(options);
      var uploadToken = putPolicy.uploadToken(mac);
      var obj = new Object();
      obj.uptoken = uploadToken;
      return _this.ctx.json(obj);
    })();
  }

  callbackAction() {
    return _asyncToGenerator(function* () {
      console.log('callbackAction.....');
      return 'callback';
    })();
  }
};
//# sourceMappingURL=qiniu.js.map