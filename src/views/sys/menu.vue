<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6">
        <el-form ref="form" :model="dataForm" label-width="80px">
          <el-form-item label="目录名称:">
            <el-input
              v-model="dataForm.name"
              placeholder="例如系统管理"
            ></el-input>
          </el-form-item>
          <el-form-item label="目录路径:">
            <el-input
              v-model="dataForm.url"
              placeholder="例如'/sys'"
            ></el-input>
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
              placeholder="例如'menu'"
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
    </el-row>
  </div>
</template>

<script>
import { addmenu, fetchPermission } from "@/api";
export default {
  name: "addmen",
  data() {
    return {
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
          label: "黄金糕",
        },
        {
          value: "th-list",
          label: "双皮奶",
        },
        {
          value: "bath",
          label: "蚵仔煎",
        },
        {
          value: "map",
          label: "龙须面",
        },
        {
          value: "tty",
          label: "北京烤鸭",
        },
      ],
    };
  },
  methods: {
    async addmenu() {
      try {
        const data = await addmenu(this.dataForm);
        setTimeout(() => {
          window.location.reload();
          this.$message({
            showClose: true,
            message: "恭喜你，这是一条成功消息",
            type: "success",
          });
        }, 2);
      } catch (error) {
        alert(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
div {
  margin-top: 3px;
  margin-right: 0px;
}
</style>
