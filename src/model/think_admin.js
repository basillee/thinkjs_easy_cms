module.exports = class extends think.Model {
    async isAdminManager(userAccount,passWord){
        if(think.isEmpty(userAccount) || think.isEmpty(passWord)){
            return false;
        }
        const map = {userAccount:userAccount,passWord:passWord}
        var data = await this.where(map).find();
       
        var result = think.isEmpty(data);
        if(result) {
            console.log('isAdminManager is = ' +  false);
            return false;
        }else{
            console.log('isAdminManager is = ' +  true);
            return true;
        }
    }
};