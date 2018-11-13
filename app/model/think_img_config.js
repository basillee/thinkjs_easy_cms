function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * 码上说数据库配置模块
 */
module.exports = class extends think.Model {

    getimgSayList() {
        var _this = this;

        return _asyncToGenerator(function* () {
            var list = yield _this.where().select();
            return list;
        })();
    }
    /**
     * 插入图片url到数据库
     * @param {*} img_url 
     * @param {*} img_type 
     */
    insertImgUrl(img_url, img_type) {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            if (think.isEmpty(img_url)) {
                return false;
            }
            const map = { img_url: img_url, img_type: img_type };
            let insertId = yield _this2.add(map);
            if (insertId >= 0) {
                return true;
            } else {
                return false;
            }
        })();
    }
};
//# sourceMappingURL=think_img_config.js.map