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

原本准备将密码进行哈希后发送给接口,然后在后端加入密码长度的校验

我准备在暑假完善一下

有发现可以很好复现的bug麻烦在项目issues里提出来,我有时间会处理的,谢谢 !



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

