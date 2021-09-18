<template>
  <div>
    <el-button
      type="primary"
      size="mini"
      @click="download(tableData, 'xxxs.txt')"
      >导出表格</el-button
    >
  </div>
</template>

<script>
export default {
  name: "exportxls",
  data() {
    return {
      tableData: `dadakdadadadadhdgdgdgsgsfsfsfsffs      rwrqrqrqrqr
                   dadadadadd
      `,
    };
  },

  methods: {
    download(data, fileName) {
      if (!data) return;
      let content = data;
      if ("download" in document.createElement("a")) {
        let link = document.createElement("a");
        link.download = fileName;
        link.style.display = "none";
        link.href = window.URL.createObjectURL(new Blob([data]));
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        link.remove();
      } else {
        navigator.msSaveBlob(blob, fileName);
      }
    },
  },
};
</script>

<style lang="less" scoped></style>
