function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * 工具类
 */
const dbInterfaceCallCount = think.model('think_interface_call_count');
var utils = {
    /**
     * 内部接口访问量统计到数据库中
     * @param {*} _interfaceName 
     */
    interfaceCallCount: (() => {
        var _ref = _asyncToGenerator(function* (_interfaceName) {
            var date = new Date().toLocaleDateString();
            var isEmpty = yield dbInterfaceCallCount.where({
                visitDate: date,
                interfaceName: _interfaceName
            }).find();
            console.log('currentDate is = ' + date + ' interface isEmpty = ' + think.isEmpty(isEmpty));
            if (think.isEmpty(isEmpty)) {
                //否则增加一条当前日期当前接口的数据
                console.log('interface data is empty.');
                dbInterfaceCallCount.add({
                    visitDate: date,
                    interfaceName: _interfaceName,
                    visitNumb: 1
                });
            } else {
                //存在当前日期的当前接口数据则访问量加一
                console.log('interface data is not empty.');
                dbInterfaceCallCount.where({
                    visitDate: date,
                    interfaceName: _interfaceName
                }).increment('visitNumb', 1);
            }
        });

        function interfaceCallCount(_x) {
            return _ref.apply(this, arguments);
        }

        return interfaceCallCount;
    })()
};
module.exports = utils;
//# sourceMappingURL=utils.js.map