function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Base = require('../base');
module.exports = class extends Base {
    __before() {
        var _this = this;

        return _asyncToGenerator(function* () {
            var isLogined = yield _this.isLogined();
            console.log('__before isLogined = ' + isLogined);
            if (!isLogined) {
                return _this.redirect('/admin/manager/');
            }
        })();
    }

    /*********************图片上传start*********************************** */
    /**
     * 码上说模块配置页面
     * http://127.0.0.1:8360/admin/imgapi/imgSayConfig
     */
    imgSayConfigAction() {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            var filePath = `${think.ROOT_PATH}/view/admin/img_cofig_config.html`;
            var config_qiniu = _this2.config('qiniu');
            var config_domain = config_qiniu.domain;
            console.log('imgSayConfigAction config_domain  ====> ', config_domain);
            _this2.assign('config_domain', config_domain);
            return _this2.display(filePath);
        })();
    }

    /**
     * http://127.0.0.1:8360/admin/imgapi/insertUrlToimgsayData
     */
    insertUrlToimgsayDataAction() {
        var _this3 = this;

        return _asyncToGenerator(function* () {
            //获取post 请求参数,如果不是post请求返回
            if (!_this3.isPost) {
                _this3.ctx.status = 400; //不是post 请求
                _this3.ctx.message = 'only post request is accetp.';
                return;
            }
            var img_url = _this3.post('img_url');
            var img_type = _this3.post('img_type');
            var isInsertOk = yield _this3.model('think_img_config').insertImgUrl(img_url, img_type);
            console.log('insertUrlToimgsayDataAction ====> img_url = ' + img_url + ' img_type = ' + img_type + ' isInsertOk = ' + isInsertOk);
            if (isInsertOk) {
                var obj = new Object();
                obj.result_code = 200;
                obj.result_msg = 'success';
                return _this3.ctx.json(obj);
            } else {
                var obj = new Object();
                obj.result_code = 401;
                obj.result_msg = 'failes';
                return _this3.ctx.json(obj);
            }
        })();
    }

    /**
     *  http://127.0.0.1:8360/admin/imgapi/getimgsayConfigData
     */
    getimgsayConfigDataAction() {
        var _this4 = this;

        return _asyncToGenerator(function* () {
            var imgSayConfigData = yield _this4.model('think_img_config').getimgSayList();
            // console.log('getimgsayConfigDataAction1111 =====> ' + JSON.stringify(imgSayConfigData));
            return _this4.ctx.json(imgSayConfigData);
        })();
    }

    /**
     *  http://127.0.0.1:8360/admin/imgapi/saveimgSayConfig
     */
    saveimgSayConfigAction() {
        var _this5 = this;

        return _asyncToGenerator(function* () {
            var id = _this5.post('id');
            var img_url = _this5.post('img_url');
            var view_numbs = _this5.post('view_numbs');
            var tap_liked_numbs = _this5.post('tap_liked_numbs');
            // var create_date = this.post('create_date');
            // var last_modify_date = this.post('last_modify_date');
            var img_type = _this5.post('img_type');

            //插入数据
            try {
                let addID = yield _this5.model('think_img_config').add({
                    id: id,
                    img_url: img_url,
                    view_numbs: view_numbs,
                    tap_liked_numbs: tap_liked_numbs,
                    // create_date: create_date,
                    // last_modify_date: last_modify_date,
                    img_type: img_type
                });
                console.log('saveAdConfigAction22222====>  addID = ' + addID);
            } catch (error) {
                var response = new Object();
                response.isError = true;
                response.msg = '保存失败，数据格式有问题';
                console.log('saveAdConfigAction3333===> : ' + _this5.ctx.json(response));
                return _this5.ctx.json(response);
            }

            //返回跟新后的数据
            let newData = yield _this5.model('think_img_config').where({
                id: id
            }).select();
            console.log('saveQrCodeMusicAction4444====> newData = ' + JSON.stringify(newData));
            return _this5.ctx.json(newData);
        })();
    }

    /**
     *  http://127.0.0.1:8360/admin/imgapi/updateimgSayConfig
     */
    updateimgSayConfigAction() {
        var _this6 = this;

        return _asyncToGenerator(function* () {
            var id = _this6.post('id');
            var img_url = _this6.post('img_url');
            var view_numbs = _this6.post('view_numbs');
            var tap_liked_numbs = _this6.post('tap_liked_numbs');
            // var create_date = this.post('create_date');
            // var last_modify_date = this.post('last_modify_date');
            var img_type = _this6.post('img_type');

            //更新数据
            let affectedRows = yield _this6.model('think_img_config').where({
                id: id
            }).update({
                id: id,
                img_url: img_url,
                view_numbs: view_numbs,
                tap_liked_numbs: tap_liked_numbs,
                // create_date: create_date,
                // last_modify_date: last_modify_date,
                img_type: img_type
            });
            //返回跟新后的数据
            if (affectedRows <= 0) {
                var response = new Object();
                response.isError = true;
                response.msg = '数据更新是败';
                console.log('saveH5TypeAction : ' + _this6.ctx.json(response));
                return _this6.ctx.json(response);
            }
            let newData = yield _this6.model('think_img_config').where({
                id: id
            }).select();
            console.log('updateH5TypeAction newData = ' + JSON.stringify(newData));
            return _this6.ctx.json(newData);
        })();
    }

    /**
     *  http://127.0.0.1:8360/admin/imgapi/deleteimgSay
     */
    deleteimgSayAction() {
        var _this7 = this;

        return _asyncToGenerator(function* () {
            var id = _this7.post('id'); //easyui 删除post参数是id，此处在html中已经和qr_type_id 绑定
            //跟新数据
            let affectedRows = yield _this7.model('think_img_config').where({
                id: id
            }).delete();
            //返回跟新后的数据
            if (affectedRows <= 0) {
                var response = new Object();
                response.isError = true;
                response.msg = '删除数据失败';
                console.log('deleteAdConfigAction2222 ====>' + +_this7.ctx.json(response));
                return _this7.ctx.json(response);
            }
            var response = new Object();
            response.success = true; //返回true 响应删除成功，页面刷新
            return _this7.ctx.json(response);
        })();
    }

    /******************************工具方法************************************************************** */
    /**
     * 判断是否已经登录
     */
    isLogined() {
        var _this8 = this;

        return _asyncToGenerator(function* () {
            var userInfo = yield _this8.session('userInfo');
            console.log('isLogined = ' + !think.isEmpty(userInfo) + ".....");
            return !think.isEmpty(userInfo);
        })();
    }
};
//# sourceMappingURL=imgapi.js.map