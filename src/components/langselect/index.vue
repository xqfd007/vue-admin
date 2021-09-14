<template>
  <div>
    <el-dropdown trigger="click" @command="handleSetLanguage">
      <a>
        <svg-icon icon-class="language" />
      </a>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>中文</el-dropdown-item>
        <el-dropdown-item>英文</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: "index",
  methods: {
    handleSetLanguage() {},
  },
};
</script>

<style lang="less" scoped></style>
