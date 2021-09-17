<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="5">
        <el-form ref="form" :model="dataForm" label-width="80px">
          <el-form-item label="目录名称:">
            <el-input
              v-model="dataForm.name"
              placeholder="例如系统管理"
            ></el-input>
          </el-form-item>
          <el-form-item label="目录路径:">
            <el-input v-model="dataForm.url" placeholder="例如/sys"></el-input>
          </el-form-item>
          <el-form-item label="目录icon:">
            <el-select v-model="dataForm.icon" placeholder="请选择">
              <el-option
                v-for="item in directoryIcon"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
                <span style="float: left; color: #8492a6; font-size: 13px">
                  <font-awesome-icon :icon="item.value" class="m-r-5" />
                </span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="菜单名称:">
            <el-input
              v-model="dataForm.menuname"
              placeholder="例如添加菜单"
            ></el-input>
          </el-form-item>
          <el-form-item label="菜单路径:">
            <el-input
              v-model="dataForm.menuurl"
              placeholder="例如menu"
            ></el-input>
          </el-form-item>
          <el-form-item label="菜单icon:">
            <el-select v-model="dataForm.menuicon" placeholder="请选择">
              <el-option
                v-for="item in directoryIcon"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
                <span style="color: #8492a6; font-size: 13px">
                  <font-awesome-icon :icon="item.value" class="m-r-5" />
                </span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addmenu">添加</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12" style="margin-left:50px">
        <el-input
          type="textarea"
          :rows="6"
          placeholder="请输入内容"
          v-model="textarea"
        >
        </el-input>

        <el-tree :data="treeData" :props="defaultProps" @node-click="">
        </el-tree>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { addmenu, fetchPermission } from "@/api";
export default {
  name: "addmen",
  data() {
    return {
      textarea:
        "目录名称和菜单名称是左侧菜单导航显示的,目标路径前面需要加/,菜单路径不需要加/,添加后在views下新建目录路径名的文件夹,在该文件下新建菜单路径名的.vue文件,菜单新建完事,如果报错可忽略刷新即可",
      dataForm: {
        name: "",
        url: "",
        icon: "",
        menuicon: "",
        menuurl: "",
        menuname: "",
      },
      directoryIcon: [
        {
          value: "bookmark",
          label: "bookmark",
        },
        {
          value: "th-list",
          label: "th-list",
        },
        {
          value: "bath",
          label: "bath",
        },
        {
          value: "map",
          label: "map",
        },
        {
          value: "tty",
          label: "tty",
        },
      ],
      routes: sessionStorage.getItem("dynamicRouters") || [],
      treeData: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1",
                },
                {
                  id: 10,
                  label: "三级 1-1-2",
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1",
            },
            {
              id: 6,
              label: "二级 2-2",
            },
          ],
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1",
            },
            {
              id: 8,
              label: "二级 3-2",
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  methods: {
    async addmenu() {
      try {
        const data = await addmenu(this.dataForm);
        this.$message({
          showClose: true,
          message: "添加菜单成功",
          type: "success",
        });
        // this.$router.go(0);
      } catch (error) {
        alert(error);
      }
      // window.location.reload();
      // this.$router.push("/sys/menu");
    },
  },
  mounted() {
    // console.log(this.routes, "fsss");
  },
};
</script>

<style lang="scss" scoped>
div {
  margin-top: 3px;
  margin-right: 0px;
}
</style>
