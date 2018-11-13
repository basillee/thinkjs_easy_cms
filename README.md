# thinkjs_easy_cms
一个简单的cms系统，支持扩展。基于nodejs语言，使用thinkjs框架。支持管理员验证码登录，接口访问统计展示，支持浏览器上传文件到七牛服务器并且插入回调地址到数据库中。
## 只需简单几步即可使用：
步骤1:

```
thinkjs_easy_cms imac$ npm install
```

步骤2:在./thinkjs_easy_cms/src/config/adapter.js中配置你自己的数据

```
  mysql: {
    handle: mysql,
    database: '',//写上你自己的数据库名称
    prefix: '',
    encoding: 'utf8',
    charset: 'utf8mb4',
    host: '127.0.0.1',
    port: '',
    user: 'root',//写上你自己的数据库用户名
    password: '',//写上你自己的数据库密码
    dateStrings: true
  }
```
步骤3:
执行根目录以下sql文件,同时可以创建部分数据
think_admin.sql（管理员信息表）
think_img_config.sql（图片管理表）
think_interface_call_count.sql（接口统计表）
```
```
步骤4:
在config文件中配置你自己的七牛服务器的相关信息，下面分别对应开发环境和生产环境：
src/config/config.development.js
src/config/config.production.js
```
module.exports = {
    workers: 1,
    qiniu:{
      access_key: '',//写上你自己七牛云的access_key
      secret_key: '',//写上你自己七牛云的secret_key
      bucket: '',//写上你自己七牛云的bucket
      domain: ''//写上你自己七牛云的domain   
    }
  };
```
步骤5:配置完成之后即可运行

```
thinkjs_easy_cms imac$ npm start
```

效果如图：
 ![Alt](https://github.com/basillee/thinkjs_easy_cms/blob/master/接口统计展示.jpg)
 ![Alt](https://github.com/basillee/thinkjs_easy_cms/blob/master/七牛云图片上传同时写入到数据库中.png)
 
本人对于nodejs也是半路出家，之前做的事android开发，有issue欢迎大家指出修改。
为了帮助更多和我一样想学习后台技术的同学，故开源此代码帮助更多同学。
同时希望成为thinkjs这么好的开源框架的一个简单学习案例。
 
 

