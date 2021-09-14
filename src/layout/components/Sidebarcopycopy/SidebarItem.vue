<template>
  <div>
    <el-submenu
      :index="router.name || router.path"
      v-if="router.children && router.children.length >= 1"
      :key="router.name"
    >
      <template slot="title">
        <item
          v-if="router.meta"
          :icon="router.meta.icon"
          :title="router.meta.title"
        />
      </template>
      <template v-for="children in router.children">
        <sidebar-item
          v-if="children.children && children.children.length >= 1"
          :key="children.path"
          :router="children"
        />
        <router-link v-else :key="children.name" :to="children.name">
          <el-menu-item :index="children.name">
            <item
              v-if="children.meta"
              :icon="children.meta.icon"
              :title="children.meta.title"
            />
          </el-menu-item>
        </router-link>
      </template>
    </el-submenu>
    <router-link
      v-else-if="!router.hidden"
      :key="router.name"
      :to="router.name"
    >
      <el-menu-item :index="router.name">
        <item
          v-if="router.meta"
          :icon="router.meta.icon"
          :title="router.meta.title"
        />
      </el-menu-item>
    </router-link>
  </div>
</template>

<script>
import path from "path";
import { isExternal } from "@/utils/validate";
import Item from "./Item";
// import AppLink from "./Link";
import FixiOSBug from "./FixiOSBug";

export default {
  name: "SidebarItem",
  components: { Item },
  mixins: [FixiOSBug],
  props: {
    // route object
    // item: {
    //   type: Object,
    //   required: true
    // },
    router: {
      type: Object,
      required: true,
    },
    isNest: {
      type: Boolean,
      default: false,
    },
    basePath: {
      type: String,
      default: "",
    },
  },

  data() {
    // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
    // TODO: refactor with render function
    this.onlyOneChild = null;
    return {
      listitem: {
        meta: { affix: true, icon: "dashboard", title: "Dashboard" },
        name: "Dashboard",
        path: "dashboard",
      },
    };
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter((item) => {
        if (item.hidden) {
          return false;
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item;
          return true;
        }
      });

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true;
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: "", noShowingChildren: true };
        return true;
      }

      return false;
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath;
      }
      if (isExternal(this.basePath)) {
        return this.basePath;
      }
      return path.resolve(this.basePath, routePath);
    },
  },
};
</script>
