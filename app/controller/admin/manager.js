function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Base = require('../base');
const svgCaptcha = require('svg-captcha');
module.exports = class extends Base {
  /**
   * 管理员登录页面
   * http://127.0.0.1:8360/admin/manager/
   */
  indexAction() {
    var _this = this;

    return _asyncToGenerator(function* () {
      var filePath = `${think.ROOT_PATH}/view/admin/admin_login.html`;
      console.log('this.url =  ' + _this.controller);
      var userInfo = yield _this.session('userInfo');
      console.log('indexAction userInfo is = ' + !think.isEmpty(userInfo));
      if (!think.isEmpty(userInfo)) {
        return _this.redirect('/admin/manager/operation');
      }
      return _this.display(filePath);
    })();
  }

  /**
  * 获取验证码
  * http://127.0.0.1:8360/admin/manager/getCaptcha
  */

  getCaptchaAction() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      var captcha = svgCaptcha.create({
        // 翻转颜色 
        inverse: false,
        // 字体大小 
        fontSize: 36,
        // 噪声线条数 
        noise: 2,
        // 宽度 
        width: 80,
        // 高度 
        height: 30
      });

      yield _this2.session('capt_cha', captcha.text.toLowerCase());
      _this2.ctx.res.setHeader('Content-Type', 'image/svg+xml');
      _this2.ctx.res.write(String(captcha.data));
      _this2.ctx.res.end();
    })();
  }
  /**
   * 是否登录成功
   */
  loginCheckAction() {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      if (!_this3.isPost) {
        return _this3.fail(1000, 'connect error'); //指定错误号和错误信息
      }

      var userAccount = _this3.post('userAccount');
      var userPassword = _this3.post('passWord');
      var captCha = _this3.post('captCha');

      var captSession = yield _this3.session('capt_cha');
      console.log(userAccount + ' : ' + userPassword + ' : captSession ' + captSession);

      if (captSession.toLowerCase() != captCha.toLowerCase()) {
        yield _this3.session(); //delete session
        return _this3.fail(1001, 'connect error'); //指定错误号和错误信息
      }
      var isAdmin = yield _this3.model('think_admin').isAdminManager(userAccount, userPassword);
      console.log(userAccount + ' : ' + userPassword + ' : reuslt in loginCheck is  = ' + !think.isEmpty(isAdmin));
      if (!think.isEmpty(isAdmin)) {
        yield _this3.session('userInfo', userAccount);
        return _this3.success({
          name: 'ok'
        });
      } else {
        yield _this3.session(); //delete session
        return _this3.fail(1000, 'connect error'); //指定错误号和错误信息
      }
    })();
  }

  /**
   * 操作页面
   * http://127.0.0.1:8360/admin/manager/operation
   */
  operationAction() {
    var _this4 = this;

    return _asyncToGenerator(function* () {
      var isLogined = yield _this4.isLogined();
      if (!isLogined) {
        return _this4.redirect('/admin/manager');
      }
      var admin_db = yield _this4.model('think_admin').where().find();
      console.log('operationAction admin_db ====> ' + JSON.stringify(admin_db));
      console.log('operationAction icon_url ====> ' + admin_db.icon_url);
      _this4.assign('icon_url', admin_db.icon_url);
      var filePath = `${think.ROOT_PATH}/view/admin/admin_operation.html`;
      return _this4.display(filePath);
    })();
  }

  /**
   * 退出登录
   * http://127.0.0.1:8360/admin/manager/loginout
   */
  loginoutAction() {
    var _this5 = this;

    return _asyncToGenerator(function* () {
      yield _this5.session(null);
      var userInfo = yield _this5.session('userInfo');
      console.log('loginout userInfo =  ' + userInfo);
      const data = yield _this5.session('userInfo');
      console.log('loginout delete session is = ' + think.isEmpty(userInfo) + 'data = ' + data);
      return _this5.redirect('/admin/manager');
    })();
  }

  /******************************工具方法************************************************************** */
  /**
   * 判断是否已经登录
   */
  isLogined() {
    var _this6 = this;

    return _asyncToGenerator(function* () {
      var userInfo = yield _this6.session('userInfo');
      return !think.isEmpty(userInfo);
    })();
  }

};
//# sourceMappingURL=manager.js.map