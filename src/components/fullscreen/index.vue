<template>
  <a role="button" @click="click">
    <svg-icon icon-class="fullscreen"></svg-icon>
  </a>
</template>

<script>
import screenfull from "screenfull";
export default {
  name: "index",
  data() {
    return {
      isFullscreen: false,
    };
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.destroy();
  },
  methods: {
    click() {
      //   if (!screenfull.enabled) {
      //     this.$message({
      //       message: "you browser can not work",
      //       type: "warning",
      //     });
      //     return false;
      //   }
      screenfull.toggle();
    },
    change() {
      this.isFullscreen = screenfull.isFullscreen;
    },
    init() {
      if (screenfull.enabled) {
        screenfull.on("change", this.change);
      }
    },
    destroy() {
      if (screenfull.enabled) {
        screenfull.off("change", this.change);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
