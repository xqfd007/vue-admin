<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <!-- <transition-group name="breadcrumb"> -->
    <!-- <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span
          v-if="item.redirect === 'noRedirect' || index == levelList.length - 1"
          class="no-redirect"
          >{{ item.meta.title }}</span
        >
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item> -->

    <el-breadcrumb-item :to="{ path: '/dashboard' }">首页</el-breadcrumb-item>

    <el-breadcrumb-item v-for="(item, index) in arr" :key="index">{{
      item.name
    }}</el-breadcrumb-item>
    <!-- </transition-group> -->
  </el-breadcrumb>
</template>

<script>
import pathToRegexp from "path-to-regexp";

export default {
  data() {
    return {
      levelList: null,
      arr: [],
    };
  },
  watch: {
    $route: {
      handler(val) {
        // console.log(val, "=====");
        this.breadcrumbData(val);
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    breadcrumbData(v) {
      // let arr = this.arr;
      this.arr = [];
      const path = v.path;
      // arr = [];
      const routes = JSON.parse(sessionStorage.getItem("dynamicRouters"));
      let tmp = routes.filter((item) => {
        if (item.children && item.children.length) {
          item.children.filter((v) => {
            if (v.name == path) {
              // this.arr.push(item.meta.title);
              this.arr.push({ name: item.meta.title, url: item.path });
              this.arr.push({ name: v.meta.title, url: v.name });
              // this.arr.unshift({ name: "首页", url: "/dshboard" });
            }
          });
        } else {
          // if ("/" + item.path == path) {
          //   // this.arr.unshift(item.meta.title);
          //   this.arr.unshift({ name: item.meta.title, url: v.path });
          //   console.log(this.arr);
          // }
        }
      });
    },
  },

  // watch: {
  //   $route(route) {
  //     // if you go to the redirect page, do not update the breadcrumbs
  //     if (route.path.startsWith("/redirect/")) {
  //       return;
  //     }
  //     this.getBreadcrumb();
  //   },
  // },
  // created() {
  //   this.getBreadcrumb();
  // },
  // methods: {
  //   getBreadcrumb() {
  //     // only show routes with meta.title
  //     let matched = this.$route.matched.filter(
  //       (item) => item.meta && item.meta.title
  //     );
  //     const first = matched[0];

  //     if (!this.isDashboard(first)) {
  //       matched = [{ path: "/dashboard", meta: { title: "Dashboard" } }].concat(
  //         matched
  //       );
  //     }

  //     this.levelList = matched.filter(
  //       (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
  //     );
  //   },
  //   isDashboard(route) {
  //     const name = route && route.name;
  //     if (!name) {
  //       return false;
  //     }
  //     return (
  //       name.trim().toLocaleLowerCase() === "Dashboard".toLocaleLowerCase()
  //     );
  //   },
  //   pathCompile(path) {
  //     // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
  //     const { params } = this.$route;
  //     var toPath = pathToRegexp.compile(path);
  //     return toPath(params);
  //   },
  //   handleLink(item) {
  //     const { redirect, path } = item;
  //     if (redirect) {
  //       this.$router.push(redirect);
  //       return;
  //     }
  //     this.$router.push(this.pathCompile(path));
  //   },
  // },
};
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
.el-breadcrumb /deep/ .el-breadcrumb__inner {
  color: #fff !important; //你想要设置的字体颜色
}
</style>
