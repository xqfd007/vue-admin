<template>
  <div>
    <el-button type="primary" size="mini" @click="download('xxxs.txt')"
      >导出表格</el-button
    >
    <a href="./test.txt">eshi</a>
  </div>
</template>

<script>
export default {
  name: "exportxls",
  data() {
    return {
      tableData: `
dadakdadadadadhdgdgdgsgsfsfsfsffs
 dadadadadd rwrqrqrqrqr
      `,
    };
  },

  methods: {
    // download(data, fileName) {
    //   if (!data) return;
    //   let content = data;
    //   if ("download" in document.createElement("a")) {
    //     let link = document.createElement("a");
    //     link.download = fileName;
    //     link.style.display = "none";
    //     link.href = window.URL.createObjectURL(new Blob([data]));
    //     document.body.appendChild(link);
    //     link.click();
    //     document.body.removeChild(link);
    //     link.remove();
    //   } else {
    //     navigator.msSaveBlob(blob, fileName);
    //   }
    // },
    // download(filename) {
    //   let data = `
    // 第一行
    // 第二行
    // `;
    //   var pom = document.createElement("a");
    //   pom.setAttribute(
    //     "href",
    //     "data:text/plain;charset=utf-8," + encodeURIComponent(data)
    //   );
    //   pom.setAttribute("download", filename);
    //   if (document.createEvent) {
    //     var event = document.createEvent("MouseEvents");
    //     event.initEvent("click", true, true);
    //     pom.dispatchEvent(event);
    //   } else {
    //     pom.click();
    //   }
    // },

    // download(fileName) {
    //   let content = `
    //   第一行
    //   第二行
    //   `;
    //   let blob = new Blob([content], {
    //     type: "text/plain;charset=utf-8",
    //   });
    //   let reader = new FileReader();
    //   reader.readAsDataURL(blob);
    //   reader.onload = function(e) {
    //     let a = document.createElement("a");
    //     a.download = fileName;
    //     a.href = e.target.result;
    //     document.body.appendChild(a);
    //     a.click();
    //     document.body.removeChild(a);
    //   };
    // },

    download(fileName) {
      let content = `第一行` + "\r\n " + `第二行`;

      let str =
        `
    第1行
    ` +
        "\r\n" +
        `第2行`;
      let a = document.createElement("a");
      a.href = "data:text/plain;charset=utf-8," + content;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },
  },
};
</script>

<style lang="less" scoped></style>
