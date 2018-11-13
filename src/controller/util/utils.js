/**
 * 工具类
 */
const dbInterfaceCallCount = think.model('think_interface_call_count');
var utils = {
    /**
     * 内部接口访问量统计到数据库中
     * @param {*} _interfaceName 
     */
    interfaceCallCount: async function interfaceCallCount(_interfaceName) {
        var date = new Date().toLocaleDateString();
        var isEmpty = await dbInterfaceCallCount.where({
            visitDate: date,
            interfaceName: _interfaceName
        }).find();
        console.log('currentDate is = ' + date + ' interface isEmpty = ' + think.isEmpty(isEmpty));
        if (think.isEmpty(isEmpty)) { //否则增加一条当前日期当前接口的数据
            console.log('interface data is empty.')
            dbInterfaceCallCount.add({
                visitDate: date,
                interfaceName: _interfaceName,
                visitNumb: 1
            });
        } else { //存在当前日期的当前接口数据则访问量加一
            console.log('interface data is not empty.')
            dbInterfaceCallCount.where({
                visitDate: date,
                interfaceName: _interfaceName
            }).increment('visitNumb', 1);
        }
    }
}
module.exports = utils;