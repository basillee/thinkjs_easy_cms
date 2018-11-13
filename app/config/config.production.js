// production config, it will load in production enviroment
module.exports = {
  workers: 0,
  port: 8361,
  qiniu: {
    access_key: '', //写上你自己七牛云的access_key
    secret_key: '', //写上你自己七牛云的secret_key
    bucket: '', //写上你自己七牛云的bucket
    domain: '' //写上你自己七牛云的domain      
  }
};
//# sourceMappingURL=config.production.js.map