const Base = require('../base');
module.exports = class extends Base {
    async __before() {
        var isLogined = await this.isLogined();
        console.log('__before isLogined = ' + isLogined);
        if (!isLogined) {
            return this.redirect('/admin/manager/');
        }
    }

    /*********************图片上传start*********************************** */
    /**
     * 码上说模块配置页面
     * http://127.0.0.1:8360/admin/imgapi/imgSayConfig
     */
    async imgSayConfigAction() {
        var filePath = `${think.ROOT_PATH}/view/admin/img_cofig_config.html`;
        var config_qiniu = this.config('qiniu');
        var config_domain = config_qiniu.domain;
        console.log('imgSayConfigAction config_domain  ====> ', config_domain);
        this.assign('config_domain', config_domain);
        return this.display(filePath);
    }

    /**
     * http://127.0.0.1:8360/admin/imgapi/insertUrlToimgsayData
     */
    async insertUrlToimgsayDataAction() {
        //获取post 请求参数,如果不是post请求返回
        if (!this.isPost) {
            this.ctx.status = 400; //不是post 请求
            this.ctx.message = 'only post request is accetp.';
            return;
        }
        var img_url = this.post('img_url');
        var img_type = this.post('img_type');
        var isInsertOk = await this.model('think_img_config').insertImgUrl(img_url, img_type);
        console.log('insertUrlToimgsayDataAction ====> img_url = ' + img_url + ' img_type = ' + img_type + ' isInsertOk = ' + isInsertOk);
        if (isInsertOk) {
            var obj = new Object();
            obj.result_code = 200;
            obj.result_msg = 'success';
            return this.ctx.json(obj);
        } else {
            var obj = new Object();
            obj.result_code = 401;
            obj.result_msg = 'failes';
            return this.ctx.json(obj);
        }
    }

    /**
     *  http://127.0.0.1:8360/admin/imgapi/getimgsayConfigData
     */
    async getimgsayConfigDataAction() {
        var imgSayConfigData = await this.model('think_img_config').getimgSayList();
        // console.log('getimgsayConfigDataAction1111 =====> ' + JSON.stringify(imgSayConfigData));
        return this.ctx.json(imgSayConfigData);
    }


    /**
     *  http://127.0.0.1:8360/admin/imgapi/saveimgSayConfig
     */
    async saveimgSayConfigAction() {
        var id = this.post('id');
        var img_url = this.post('img_url');
        var view_numbs = this.post('view_numbs');
        var tap_liked_numbs = this.post('tap_liked_numbs');
        // var create_date = this.post('create_date');
        // var last_modify_date = this.post('last_modify_date');
        var img_type = this.post('img_type');


        //插入数据
        try {
            let addID = await this.model('think_img_config')
                .add({
                    id: id,
                    img_url: img_url,
                    view_numbs: view_numbs,
                    tap_liked_numbs: tap_liked_numbs,
                    // create_date: create_date,
                    // last_modify_date: last_modify_date,
                    img_type: img_type,
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
        let newData = await this.model('think_img_config').where({
            id: id
        }).select();
        console.log('saveQrCodeMusicAction4444====> newData = ' + JSON.stringify(newData));
        return this.ctx.json(newData);
    }

    /**
     *  http://127.0.0.1:8360/admin/imgapi/updateimgSayConfig
     */
    async updateimgSayConfigAction() {
        var id = this.post('id');
        var img_url = this.post('img_url');
        var view_numbs = this.post('view_numbs');
        var tap_liked_numbs = this.post('tap_liked_numbs');
        // var create_date = this.post('create_date');
        // var last_modify_date = this.post('last_modify_date');
        var img_type = this.post('img_type');

        //更新数据
        let affectedRows = await this.model('think_img_config')
            .where({
                id: id
            })
            .update({
                id: id,
                img_url: img_url,
                view_numbs: view_numbs,
                tap_liked_numbs: tap_liked_numbs,
                // create_date: create_date,
                // last_modify_date: last_modify_date,
                img_type: img_type,
            });
        //返回跟新后的数据
        if (affectedRows <= 0) {
            var response = new Object();
            response.isError = true;
            response.msg = '数据更新是败';
            console.log('saveH5TypeAction : ' + this.ctx.json(response));
            return this.ctx.json(response);
        }
        let newData = await this.model('think_img_config').where({
            id: id
        }).select();
        console.log('updateH5TypeAction newData = ' + JSON.stringify(newData));
        return this.ctx.json(newData);
    }


    /**
     *  http://127.0.0.1:8360/admin/imgapi/deleteimgSay
     */
    async deleteimgSayAction() {
        var id = this.post('id'); //easyui 删除post参数是id，此处在html中已经和qr_type_id 绑定
        //跟新数据
        let affectedRows = await this.model('think_img_config')
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
}