本项目是星座运势查询网页端的数据后台

详细项目信息请看[后端项目](https://gitee.com/daniel8642/constellation-fortune-backend)https://gitee.com/daniel8642/constellation-fortune-backend

修改自[我的vue手脚架项目](https://gitee.com/daniel8642/vue-base)

请求都使用在src/utils/request.js中二次封装的axios

在返回前对请求进行处理

```javascript
options.url = "http://your.DomainNameOrIP.com" + options.url;
```

即可自定义所有接口请求地址

本项目有接口有时间戳校验,登录态校验,权限校验模块

因为是为了交课程大作业的作品

这个数据后台还有很多bug

有发现可以很好复现的bug请在项目issues里提出来,我有时间会处理的,谢谢 !

在前端加入了用key摘要密码的算法,请确保数据库密码条目可以存储长度为64的string



使用的技术

Ant Design Vue组件库

echarts图标库

项目效果
http://back.86428642.xyz/


项目地址
https://gitee.com/daniel8642/constellation-chart-backend

前台项目:
https://gitee.com/daniel8642/vue-constellation-chart

后端项目:
https://gitee.com/daniel8642/constellation-fortune-backend

