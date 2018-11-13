const Base = require('../base');
const dbInterfaceCallCount = think.model('think_interface_call_count');
const dbAdConfigModel = think.model('think_ad_config');
module.exports = class extends Base {

    async __before() {
        var isLogined = await this.isLogined();
        console.log('__before isLogined = ' + isLogined);
        if (!isLogined) {
            return this.redirect('/admin/manager/');
        }
    }


    async indexAction() {
        var filePath = `${think.ROOT_PATH}/view/index_index.html`;
        return this.display(filePath);
    }

    /**
     * 接口分析页面
     * http://127.0.0.1:8360/admin/commonapi/interfaceAnalyze
     */
    async interfaceAnalyzeAction() {
        var filePath = `${think.ROOT_PATH}/view/admin/interface_analyze.html`;

        var type = this.get('type');
        console.log('type  ======>' + type);
        if (think.isEmpty(type)) {
            type = 7;
        }
        //折线图
        //第一步获取接口名称
        var currentDate = new Date().toLocaleDateString();
        console.log('step 0.5: ' + currentDate);
        var interfaceNames = await dbInterfaceCallCount.field('interfaceName').distinct('interfaceName').select();
        console.log('step 1: ' + JSON.stringify(interfaceNames));

        //第二步接口名称存入数组
        var interfaceNameArr = new Array();
        for (var i = 0; i < interfaceNames.length; i++) {
            interfaceNameArr.push(interfaceNames[i].interfaceName);
        }
        console.log('step 2: ' + interfaceNameArr.toString());

        var interval = 7;
        if (type == 30) {
            interval = 30;
        } else if (type == 60) {
            interval = 60;
        }
        //第三步获取前interval天日期存入数组，同时获得前面interval天数据
        var date2 = new Date();
        date2.setTime(new Date().getTime() - ((interval - 1) * 24 * 60 * 60 * 1000)); //往前数interval -1 (6)天，包含今天也就是interval(7)天
        date2 = date2.toLocaleDateString();
        var allDataInDb = await dbInterfaceCallCount.where({
            visitDate: ['BETWEEN', date2, currentDate]
        }).select();

        var xDateArr = new Array();
        for (var i = (interval - 1); i >= 0; i--) {
            var datetmp = new Date();
            datetmp.setTime(new Date().getTime() - (i * 24 * 60 * 60 * 1000)); //往前数6天，包含今天也就是7天
            datetmp = datetmp.toLocaleDateString();
            xDateArr.push(datetmp);
        }
        console.log('step 3: ' + 'currentDate = ' + currentDate + " : date2 = " + date2 + 'allDataInDb = ' + JSON.stringify(allDataInDb));
        //第四步拼装数据
        var resultDataArr = new Array();
        //第一层循环，获得所有的接口名称
        for (var i = 0; i < interfaceNameArr.length; i++) {
            var tmpInterfaceName = interfaceNameArr[i];
            var tmpResultData = new Object();
            tmpResultData.name = tmpInterfaceName;
            tmpResultData.type = 'line';
            tmpResultData.data = new Array();
            //初始化数据结果集数组
            for(var n =0;n<xDateArr.length;n++){
                tmpResultData.data.push(0);
            }
            //第二层循环，获取所有的数据
            for (var j = 0; j < allDataInDb.length; j++) {
                var tmpData = allDataInDb[j];
                if (tmpInterfaceName == tmpData.interfaceName) {
                    //第三层循环，遍历日期，如果接口名称和单个数据的名称匹配，那么看单条数据的日期是哪天push到数据结果集中
                    for (var m = 0; m < xDateArr.length; m++) {
                        // console.log('step3.5.... tmpData =  ' + JSON.stringify(tmpData) + ' || xDateArr[' + m + '] = ' + xDateArr[m]);
                        // console.log('step3.6....' + this.timeStamp2String(tmpData.visitDate)+ '||' + this.timeStamp2String(xDateArr[m]));
                        if (this.timeStamp2String(tmpData.visitDate) == this.timeStamp2String(xDateArr[m])) {
                            var tmpobj = tmpResultData.data[m];
                            if(tmpobj == 0){
                                tmpResultData.data[m] = tmpData.visitNumb;
                            }
                            // tmpResultData.data.push(tmpData.visitNumb);
                        } 
                    }
                }
            }
            resultDataArr.push(tmpResultData);
        }
        console.log('step4: resultDataArr = ' + JSON.stringify(resultDataArr));
        this.assign('interfaceNameArr', interfaceNameArr.toString());
        this.assign('xDateArr', xDateArr.toString());
        this.assign('resultDataArr', JSON.stringify(resultDataArr));

        // 饼图数据
        var pieResultArr = new Array();
        var min = 0;
        var max = 0;
        for (var i = 0; i < interfaceNameArr.length; i++) {
            var tmpInterfaceName = interfaceNameArr[i];
            var tmpResultData = new Object();
            var sumVisitNum = 0;
            for (var j = 0; j < allDataInDb.length; j++) {
                if (tmpInterfaceName == allDataInDb[j].interfaceName) {
                    sumVisitNum = sumVisitNum + allDataInDb[j].visitNumb;
                }
            }
            if (sumVisitNum > max) {
                max = sumVisitNum;
            }
            if (sumVisitNum < min) {
                min = sumVisitNum;
            }
            tmpResultData.name = tmpInterfaceName;
            tmpResultData.value = sumVisitNum;
            pieResultArr.push(tmpResultData);
        }
        this.assign('pieResultArr', JSON.stringify(pieResultArr));
        this.assign('pieMax', max);
        this.assign('pieMin', min);
        return this.display(filePath);
    }

    

    /*********************广告开关控制start*********************************** */

    /**
     *  http://127.0.0.1:8360/admin/commonapi/adConfig
     */
    async adConfigAction() {
        var filePath = `${think.ROOT_PATH}/view/admin/ad_config.html`;
        return this.display(filePath);
    }

    /**
     *  http://127.0.0.1:8360/admin/commonapi/getAdConfigData
     */
    async getAdConfigDataAction() {
        var adConfigData = await dbAdConfigModel.where().select();
        console.log('adConfigData1111 =====> ' + JSON.stringify(adConfigData));
        return this.ctx.json(adConfigData);
    }


    /**
     *  http://127.0.0.1:8360/admin/commonapi/saveAdConfig
     */
    async saveAdConfigAction() {
        var id = this.post('id');
        var pkg_name = this.post('pkg_name');
        var gdt_app_id = this.post('gdt_app_id');
        var gdt_splash_id = this.post('gdt_splash_id');
        var gdt_banner_id = this.post('gdt_banner_id');
        var gdt_interstitial_id = this.post('gdt_interstitial_id');
        var oppo_gdt_ad_is_open = this.post('oppo_gdt_ad_is_open');
        var vivo_gdt_ad_is_open = this.post('vivo_gdt_ad_is_open');
        var huawei_gdt_ad_is_open = this.post('huawei_gdt_ad_is_open');
        var tencent_gdt_ad_is_open = this.post('tencent_gdt_ad_is_open');
        var baidu_gdt_ad_is_open = this.post('baidu_gdt_ad_is_open');
        var xiaomi_gdt_ad_is_open = this.post('xiaomi_gdt_ad_is_open');

        //插入数据
        try {
            let addID = await dbAdConfigModel
                .add({
                    id: id,
                    pkg_name: pkg_name,
                    gdt_app_id: gdt_app_id,
                    gdt_splash_id: gdt_splash_id,
                    gdt_banner_id: gdt_banner_id,
                    gdt_interstitial_id: gdt_interstitial_id,
                    oppo_gdt_ad_is_open: oppo_gdt_ad_is_open,
                    vivo_gdt_ad_is_open: vivo_gdt_ad_is_open,
                    huawei_gdt_ad_is_open: huawei_gdt_ad_is_open,
                    tencent_gdt_ad_is_open: tencent_gdt_ad_is_open,
                    baidu_gdt_ad_is_open: baidu_gdt_ad_is_open,
                    xiaomi_gdt_ad_is_open: xiaomi_gdt_ad_is_open
                });

            console.log('saveAdConfigAction22222====>  addID = ' + addID);
        } catch (error) {
            var response = new Object();
            response.isError = true;
            response.msg = '保存失败，数据格式有问题';
            console.log('saveAdConfigAction3333===> : ' + this.ctx.json(response));
            return this.ctx.json(response);
        }

        //返回跟新后的数据
        let newData = await dbAdConfigModel.where({
            id: id
        }).select();
        console.log('saveCodeMusicAction4444====> newData = ' + JSON.stringify(newData));
        return this.ctx.json(newData);
    }

    /**
     *  http://127.0.0.1:8360/admin/commonapi/updateAdConfig
     */
    async updateAdConfigAction() {
        var id = this.post('id');
        var pkg_name = this.post('pkg_name');
        var gdt_app_id = this.post('gdt_app_id');
        var gdt_splash_id = this.post('gdt_splash_id');
        var gdt_banner_id = this.post('gdt_banner_id');
        var gdt_interstitial_id = this.post('gdt_interstitial_id');
        var oppo_gdt_ad_is_open = this.post('oppo_gdt_ad_is_open');
        var vivo_gdt_ad_is_open = this.post('vivo_gdt_ad_is_open');
        var huawei_gdt_ad_is_open = this.post('huawei_gdt_ad_is_open');
        var tencent_gdt_ad_is_open = this.post('tencent_gdt_ad_is_open');
        var baidu_gdt_ad_is_open = this.post('baidu_gdt_ad_is_open');
        var xiaomi_gdt_ad_is_open = this.post('xiaomi_gdt_ad_is_open');

        //更新数据
        let affectedRows = await dbAdConfigModel
            .where({
                id: id
            })
            .update({
                id: id,
                pkg_name: pkg_name,
                gdt_app_id: gdt_app_id,
                gdt_splash_id: gdt_splash_id,
                gdt_banner_id: gdt_banner_id,
                gdt_interstitial_id: gdt_interstitial_id,
                oppo_gdt_ad_is_open: oppo_gdt_ad_is_open,
                vivo_gdt_ad_is_open: vivo_gdt_ad_is_open,
                huawei_gdt_ad_is_open: huawei_gdt_ad_is_open,
                tencent_gdt_ad_is_open: tencent_gdt_ad_is_open,
                baidu_gdt_ad_is_open: baidu_gdt_ad_is_open,
                xiaomi_gdt_ad_is_open: xiaomi_gdt_ad_is_open
            });
        //返回跟新后的数据
        if (affectedRows <= 0) {
            var response = new Object();
            response.isError = true;
            response.msg = '数据更新是败';
            console.log('saveH5TypeAction : ' + this.ctx.json(response));
            return this.ctx.json(response);
        }
        let newData = await dbAdConfigModel.where({
            id: id
        }).select();
        console.log('updateH5TypeAction newData = ' + JSON.stringify(newData));
        return this.ctx.json(newData);

    }


      /**
     *  http://127.0.0.1:8360/admin/commonapi/deleteAdConfig
     */
    async deleteAdConfigAction() {
        var id = this.post('id'); //easyui 删除post参数是id，此处在html中已经和_type_id 绑定
        //跟新数据
        let affectedRows = await dbAdConfigModel
            .where({
                id: id
            })
            .delete();
        //返回跟新后的数据
        if (affectedRows <= 0) {
            var response = new Object();
            response.isError = true;
            response.msg = '删除数据失败';
            console.log('deleteAdConfigAction2222 ====>' + +this.ctx.json(response));
            return this.ctx.json(response);
        }
        var response = new Object();
        response.success = true; //返回true 响应删除成功，页面刷新
        return this.ctx.json(response);

    }

    /******************************工具方法************************************************************** */
    /**
     * 判断是否已经登录
     */
    async isLogined() {
        var userInfo = await this.session('userInfo');
        console.log('isLogined = ' + !think.isEmpty(userInfo) + ".....");
        return !think.isEmpty(userInfo);
    }

    timeStamp2String(time) {
        var datetime = new Date(time.replace(/-/, "/"))
        // console.log('timeStamp2String111  ====>' + datetime.toLocaleDateString());
        var year = datetime.getFullYear();
        var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
        var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
        var hour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
        var minute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
        var second = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
        // console.log('timeStamp2String222  ====>' + year + "-" + month + "-" + date);
        return year + "-" + month + "-" + date;
    }

    checkURL(URL) {
        var str = URL;
        //判断URL地址的正则表达式为:http(s)?://([\w-]+\.)+[\w-]+(/[\w- ./?%&=]*)?
        //下面的代码中应用了转义字符"\"输出一个字符"/"
        var Expression = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
        var objExp = new RegExp(Expression);
        if (objExp.test(str) == true) {
            return true;
        } else {
            return false;
        }
    }
};