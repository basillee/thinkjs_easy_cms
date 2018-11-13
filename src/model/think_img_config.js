/**
 * 码上说数据库配置模块
 */
module.exports = class extends think.Model {

    async getimgSayList(){
        var list = await this.where().select();
        return list;
    }
    /**
     * 插入图片url到数据库
     * @param {*} img_url 
     * @param {*} img_type 
     */
    async insertImgUrl(img_url,img_type){
        if(think.isEmpty(img_url)){
            return false;
        }
        const map = {img_url:img_url,img_type:img_type};
        let insertId = await this.add(map);
        if(insertId>=0){
            return true;
        }else{
            return false;
        }
    }
};