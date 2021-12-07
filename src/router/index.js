import Vue from "vue";
import Router from "vue-router";

import NProgress from "nprogress";
import { getToken, removeToken } from "@/utils/auth";
import { fetchPermission } from "@/api";
import { Message } from "element-ui"; // 引入
Vue.use(Router);
NProgress.configure({ showSpinner: false });
const whiteList = ["/login", "/auth-redirect"]; // 白名单
const Layout = () => import("../layout/index.vue");
// 全局路由
const globalRoutes = [
  {
    path: "/404",
    component: () => import("@/views/common/404.vue"),
    name: "404",
    meta: { title: "404未找到" },
  },

  {
    path: "/login",
    component: () => import("@/views/common/login.vue"),
    meat: { title: "登录" },
    name: "login",
  },
];
// home
const homeRouter = {
  path: "dashboard",
  redirect: { path: "dashboard" },
  name: "/dashboard",
  meta: { title: "首页", icon: "tachometer-alt" },
};
// 主要路由
const mainRouters = {
  path: "/",
  component: Layout,
  name: "main",
  redirect: { path: "dashboard" },
  children: [
    {
      path: "dashboard",
      component: () => import("@/views/common/dashboard"),
      name: "dashboard",
      meta: { title: "dashboard", icon: "tachometer-alt" },
    },
  ],
  beforeRouteEnter(to, from, next) {
    const token = getToken();
    if (!token) {
      next({ name: "login" });
      NProgress.done();
    }
    next();
  },
};
// 创建路由
const createRouter = () =>
  new Router({
    mode: "hash",
    scrollBehavior: () => ({ y: 0 }),
    isAddDynameicMenuRoutes: false, //是否已添加动态(菜单路由)
    routes: globalRoutes.concat(mainRouters),
  });

const router = createRouter();
// 重置路由
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher;
}

// 清除登录信息
export function resetLoginInfo() {
  removeToken();
  resetRouter();
  router.options.isAddDynameicMenuRoutes = false;
}
router.beforeEach(async (to, from, next) => {
  NProgress.start();
  const hasToken = getToken();
  if (
    router.options.isAddDynameicMenuRoutes ||
    fnCurrentRouteType(to, globalRoutes) === "global"
  ) {
    next();
  } else {
    if (hasToken) {
      try {
        const data = await fetchPermission();
        fnCreateDynamicRouters(data);
        router.options.isAddDynameicMenuRoutes = true;
        next({ ...to, replace: true });
      } catch (error) {
        console.log(`${error}  ,请求菜单列表和权限数据失败,跳转到登录页!!`);
        resetLoginInfo();
        next({ name: "login" });
        NProgress.done();
      }
    } else {
      // Message.warning("请先登录!!!");
      next({ name: "login" });
    }
  }
});
router.afterEach(() => {
  NProgress.done();
});
/* 
判断当前路由类型,是global:全局路由还是main:主要路由
*/
function fnCurrentRouteType(route, globalRoutes = []) {
  let temp = [];
  for (let i = 0; i < globalRoutes.length; i++) {
    if (route.path === globalRoutes[i].path) {
      return "global";
    } else if (globalRoutes[i].children && globalRoutes[i].length >= 1) {
      temp = temp.concat(globalRoutes[i].children);
    }
  }
  return temp.length >= 1 ? fnCurrentRouteType(route, temp) : "main";
}

/* 初始化路由 */
function initRoute(menuItem) {
  return {
    path: menuItem.url,
    component: null,
    name: menuItem.url,
    meta: {
      icon: menuItem.icon,
      menuId: menuItem.url,
      title: menuItem.name,
      isDynamic: true,
      iFrameUrl: "",
    },
  };
}
function setChildren(route, childrenRoute) {
  if (!/^\/.*/.test(route.path)) {
    route["component"] = {
      template: `
        <transition name='fade-transform' mode='out-in'>
            <keep-alive>
              <router-view />
            </keep-alive>
        </transition>
      `,
    };
  } else {
    route["component"] = Layout;
  }
  route["children"] = childrenRoute;
}
function createTreeRoutes(menuList = [], parentPath = "") {
  const childrenRoutes = [];
  for (let i = 0; i < menuList.length; i++) {
    const menuItem = menuList[i];
    const route = initRoute(menuItem);
    if (menuItem.menuList && menuItem.menuList.length >= 1) {
      const path =
        parentPath && parentPath.length > 0
          ? parentPath + "/" + route.path
          : route.path;
      route["name"] = path;
      setChildren(route, createTreeRoutes(menuItem.menuList, path));
    } else {
      try {
        route["name"] = `${parentPath}/${menuItem.url}`;
        route["component"] = () => import(`@/views${route.name}`) || null;
      } catch (error) {
        console.debug(error.message);
      }
    }
    childrenRoutes.push(route);
  }
  return childrenRoutes;
}
/* 
  整理动态添加菜单路由
*/

function fnCreateDynamicRouters(menuList = []) {
  const routers = createTreeRoutes(menuList);
  routers.unshift(homeRouter);
  routers.push({ path: "*", redirect: { name: "404" }, hidden: true });
  router.addRoutes(routers);
  sessionStorage.setItem("dynamicRouters", JSON.stringify(routers || "[]"));
  console.log(
    "\n%c!<------------动态(菜单)路由 s  --------------->",
    "color:blue"
  );
  console.log(routers);
  console.log(
    "%c!<------------动态(菜单)路由 s  --------------->\n\n",
    "color:blue"
  );
}
export default router;
