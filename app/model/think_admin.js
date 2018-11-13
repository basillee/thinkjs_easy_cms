function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

module.exports = class extends think.Model {
    isAdminManager(userAccount, passWord) {
        var _this = this;

        return _asyncToGenerator(function* () {
            if (think.isEmpty(userAccount) || think.isEmpty(passWord)) {
                return false;
            }
            const map = { userAccount: userAccount, passWord: passWord };
            var data = yield _this.where(map).find();

            var result = think.isEmpty(data);
            if (result) {
                console.log('isAdminManager is = ' + false);
                return false;
            } else {
                console.log('isAdminManager is = ' + true);
                return true;
            }
        })();
    }
};
//# sourceMappingURL=think_admin.js.map