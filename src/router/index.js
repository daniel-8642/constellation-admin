import Vue from "vue";
import VueRouter from "vue-router";
import findLast from "lodash/findLast";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { notification } from "ant-design-vue";
import { check, isLogin } from "@/utils/auth";

Vue.use(VueRouter);

const routes = [
  {
    path: "/user",
    hideInMenu: true,
    component: () =>
      import(/* webpackChunkName: "layouts" */ "../layouts/UserLayout"),
    children: [
      {
        path: "/user",
        redirect: "/user/login",
      },
      {
        path: "/user/login",
        name: "login",
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/User/Login"),
      },
      {
        path: "/user/register",
        name: "register",
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/User/Register"),
      },
      {
        path: "/user/register-result",
        name: "register.result",
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/User/RegisterResult"),
      },
    ],
  },
  {
    path: "/",
    meta: { authority: 50 },
    component: () =>
      import(/* webpackChunkName: "layouts" */ "../layouts/BasicLayout"),
    children: [
      // dashboard
      {
        path: "/",
        redirect: "/dashboard/viewanalysis",
      },
      {
        path: "/dashboard",
        name: "dashboard",
        meta: { icon: "dashboard", title: "数据统计" },
        component: { render: (h) => h("router-view") },
        children: [
          {
            path: "/dashboard/viewanalysis",
            name: "analysis",
            meta: { title: "近期访问" },
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ "../views/Dashboard/ViewAnalysis"
              ),
          },
          {
            path: "/dashboard/consanalysis",
            name: "analysis",
            meta: { title: "星座浏览" },
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ "../views/Dashboard/constellationAnalysis"
              ),
          },
        ],
      },
      // form
      {
        path: "/form",
        name: "form",
        component: { render: (h) => h("router-view") },
        meta: { icon: "form", title: "用户管理", authority: 10 },
        children: [
          {
            path: "/form/add-user-form",
            name: "adduserform",
            meta: { title: "添加用户" },
            component: () =>
              import(
                /* webpackChunkName: "form" */ "../views/Forms/AddUserForm"
              ),
          },
          {
            path: "/form/update-passwd-form",
            name: "updatepasswdform",
            meta: { title: "修改密码" },
            component: () =>
              import(
                /* webpackChunkName: "form" */ "../views/Forms/UpdatePasswdForm"
              ),
          },
        ],
      },
      // Exception
      {
        path: "/exception",
        // name: "exception",
        component: { render: (h) => h("router-view") },
        redirect: "/exception/403",
        meta: { title: "异常页", icon: "warning", authority: 100 },
        children: [
          {
            path: "/exception/403",
            // name: "exception403",
            component: () =>
              import(
                /* webpackChunkName: "exception" */ "@/views/Exception/403"
              ),
            meta: { title: "403" },
          },
          {
            path: "/exception/404",
            // name: "exception404",
            component: () =>
              import(
                /* webpackChunkName: "exception" */ "@/views/Exception/404"
              ),
            meta: { title: "404" },
          },
          {
            path: "/exception/500",
            // name: "exception500",
            component: () =>
              import(
                /* webpackChunkName: "exception" */ "@/views/Exception/500"
              ),
            meta: { title: "500" },
          },
        ],
      },
    ],
  },
  {
    path: "/403",
    name: "403",
    hideInMenu: true,
    component: () =>
      import(/* webpackChunkName: "exception" */ "@/views/Exception/403"),
  },
  {
    path: "*",
    name: "404",
    hideInMenu: true,
    component: () =>
      import(/* webpackChunkName: "exception" */ "@/views/Exception/404"),
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});
// 在改变风格的时候不出现加载进度条
router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    NProgress.start();
  }
  const record = findLast(to.matched, (record) => record.meta.authority);
  console.log(record);
  if (record && !check(record.meta.authority + 1)) {
    if (!isLogin() && to.path !== "/user/login") {
      next({
        path: "/user/login",
      });
    } else if (to.path !== "/403") {
      notification.error({
        message: "403",
        description: "你没有权限,请联系管理员",
      });
      next({
        path: "/403",
      });
    }
    NProgress.done();
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => console.log(err));
};

export default router;
