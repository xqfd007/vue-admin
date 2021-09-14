<template>
  <section id="wrapper" class="login-register">
    <div class="login-box">
      <div class="white-box">
        <h2 class="text-center">
          <!-- <b>xqf</b> -->
          <p>vue-admin-element</p>
        </h2>
        <el-form
          ref="dataForm"
          :model="dataForm"
          status-icon
          @keyup.native.enter="login"
        >
          <el-form-item prop="userName">
            <el-col :xs="12" class="col-xs-12">
              <input
                type="text"
                class="form-control"
                v-model="dataForm.userName"
                placeholder="用户名"
                required=""
                ref="inputName"
              />
            </el-col>
          </el-form-item>
          <el-form-item prop="passWord">
            <el-col :xs="12" class="col-xs-12">
              <input
                class="form-control"
                type="text"
                v-model="dataForm.passWord"
                placeholder="密码"
                required=""
              />
            </el-col>
          </el-form-item>
          <div class="form-group">
            <div class="pull-left">
              <el-checkbox v-model="dataForm.checked">记住我</el-checkbox>
            </div>
            <a href="javascript:void(0)">
              <font-awesome-icon icon="lock" class="m-r-5" /> <i> 忘记密码?</i>
            </a>
          </div>
          <div class="form-group">
            <el-button type="success" class="login-btn" @click="login"
              >登录</el-button
            >
            <el-button type="primary" class="login-btn">域名登录</el-button>
          </div>

          <el-row>
            <el-col :xs="12">
              <div class="social">
                <lang-select class="btn-facebook"></lang-select>
                <full-screen></full-screen>
              </div>
            </el-col>
          </el-row>
          <div class="form-group">
            <p>
              没账户?<a href="javascript:void(0)">
                <b>注册</b>
              </a>
            </p>
          </div>
        </el-form>
      </div>
    </div>

    <!-- <img src="../../assets/images/top_images/login.png" alt=""> -->
  </section>
</template>

<script>
import LangSelect from "@/components/langselect";
import FullScreen from "@/components/fullscreen";
import { login } from "@/api";
import { setToken } from "@/utils/auth";
export default {
  name: "index",
  data() {
    return {
      dataForm: {
        userName: "",
        passWord: "",
        checked: "false",
      },
    };
  },
  methods: {
    async login() {
      const { userName } = this.dataForm;
      if (userName.trim()) {
        try {
          const data = await login(userName);
          setToken(data.token);
          this.$router.push({ name: "dashboard" });
          this.$notify({
            title: "标题名称",
            message: "欢迎光临[" + data.actualName + "]",
            type: "success",
            duration: 1200,
          });
        } catch (error) {
          this.$message.error(error);
        }
      } else {
        this.$message.error("用户名或密码不能为空");
      }
    },
  },
  components: {
    LangSelect,
    FullScreen,
  },
  mounted() {
    this.$refs.inputName.focus();
  },
};
</script>

<style lang="scss" scoped>
.login-register {
  //   display: flex;
  //   align-items: center;
  //   justify-content: space-around;
  background: rgba(0, 0, 0, 0.2);
  position: relative;
  height: 100%;
}
.login-register::before {
  z-index: -999;
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-image: url("../../assets/images/top_images/login.png");
  background-size: cover;
}
.white-box {
  width: 100%;
}

.login-box {
  position: absolute;
  right: 0;
  margin-top: 0;
  height: 100%;
  background: white;
  width: 300px;
  box-sizing: border-box;
  padding: 0 25px;
}
.text-center {
  margin-top: 30px;
  text-align: center;
  font-size: 18px;
  margin-bottom: 40px;
}
.form-control {
  display: inline-block;
  border: none;
  border-bottom: 1px solid #f1f1f1f8;
  height: 32px;
  width: 100%;
  max-width: 100%;
  outline: none;
  padding: 7px 0px;
  margin: 0 auto;
}
.form-control:focus {
  width: 180px;
  border: none;
  border-bottom: 1px solid blue;
  width: 300px;
  transition: 0.7s ease-in-out;
}
.form-group {
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 20px;
}
.login-btn {
  width: 40%;
}
.btn-facebook {
  margin-right: 10px;
}
.social {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}
.form-group p {
  font-size: 13px;
  a {
    color: #7460ee;
    margin-left: 4px;
  }
}

.form-group a .m-r-5 {
  font-size: 13px;
  margin-right: 1px;
}
.form-group a i {
  font-size: 14px;
  margin-left: 2px;
  font-style: normal;
  font-weight: normal;
}
</style>
