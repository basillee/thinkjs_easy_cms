const Base = require('../base');
const svgCaptcha = require('svg-captcha');
module.exports = class extends Base {
  /**
   * 管理员登录页面
   * http://127.0.0.1:8360/admin/manager/
   */
  async indexAction() {
    var filePath = `${think.ROOT_PATH}/view/admin/admin_login.html`
    console.log('this.url =  ' + this.controller);
    var userInfo = await this.session('userInfo');
    console.log('indexAction userInfo is = ' + !think.isEmpty(userInfo))
    if (!think.isEmpty(userInfo)) {
      return this.redirect('/admin/manager/operation');
    }
    return this.display(filePath);
  }


   /**
   * 获取验证码
   * http://127.0.0.1:8360/admin/manager/getCaptcha
   */

  async  getCaptchaAction() {
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
      height: 30,
    });

    await this.session('capt_cha', captcha.text.toLowerCase());
    this.ctx.res.setHeader('Content-Type', 'image/svg+xml');
    this.ctx.res.write(String(captcha.data));
    this.ctx.res.end();

  }
  /**
   * 是否登录成功
   */
  async loginCheckAction() {
    if (!this.isPost) {
      return this.fail(1000, 'connect error'); //指定错误号和错误信息
    }

    var userAccount = this.post('userAccount');
    var userPassword = this.post('passWord');
    var captCha = this.post('captCha');

    var captSession = await this.session('capt_cha');
    console.log(userAccount + ' : ' + userPassword + ' : captSession ' + captSession);

    if(captSession.toLowerCase()!=captCha.toLowerCase()){
      await this.session(); //delete session
      return this.fail(1001, 'connect error'); //指定错误号和错误信息
    }
    var isAdmin = await this.model('think_admin').isAdminManager(userAccount, userPassword);
    console.log(userAccount + ' : ' + userPassword + ' : reuslt in loginCheck is  = ' + !think.isEmpty(isAdmin));
    if (!think.isEmpty(isAdmin)) {
      await this.session('userInfo', userAccount);
      return this.success({
        name: 'ok'
      });

    } else {
      await this.session(); //delete session
      return this.fail(1000, 'connect error'); //指定错误号和错误信息
    }
  }

  /**
   * 操作页面
   * http://127.0.0.1:8360/admin/manager/operation
   */
  async operationAction() {
    var isLogined = await this.isLogined();
    if (!isLogined) {
      return this.redirect('/admin/manager');
    }
    var admin_db = await this.model('think_admin').where().find();
    console.log('operationAction admin_db ====> ' + JSON.stringify(admin_db));
    console.log('operationAction icon_url ====> ' + admin_db.icon_url);
    this.assign('icon_url',admin_db.icon_url);
    var filePath = `${think.ROOT_PATH}/view/admin/admin_operation.html`;
    return this.display(filePath);
  }

  /**
   * 退出登录
   * http://127.0.0.1:8360/admin/manager/loginout
   */
  async loginoutAction() {
    await this.session(null);
    var userInfo = await this.session('userInfo');
    console.log('loginout userInfo =  ' + userInfo);
    const data = await this.session('userInfo');
    console.log('loginout delete session is = ' + think.isEmpty(userInfo) + 'data = ' + data);
    return this.redirect('/admin/manager');
  }



  /******************************工具方法************************************************************** */
  /**
   * 判断是否已经登录
   */
  async isLogined() {
    var userInfo = await this.session('userInfo');
    return !think.isEmpty(userInfo);
  }



}