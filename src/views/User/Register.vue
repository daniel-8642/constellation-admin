<template>
  <div class="context">
    <img alt="logo" class="logo" src="@/assets/code.png" />
    <div class="title">
      <a class="back" @click="$router.push('/user/login')">返回</a>
      <h2>新用户注册</h2>
    </div>
    <a-form
      id="components-form-demo-normal-login"
      :form="form"
      class="login-form"
      @submit="handleSubmit"
    >
      <a-form-item>
        <a-input
          v-decorator="[
            'Username',
            {
              initialValue: defaultusername,
              rules: [
                { required: true, message: '请输入用户名!' },
                { required: true, min: 6, message: '不能小于5位' },
              ],
            },
          ]"
          placeholder="Username"
        >
          <a-icon
            slot="prefix"
            style="color: rgba(0, 0, 0, 0.25)"
            type="user"
          />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="[
            'Password',
            {
              initialValue: defaultpasswd,
              rules: [
                { required: true, message: '请输入用户名!' },
                { required: true, min: 6, message: '不能小于5位' },
              ],
            },
          ]"
          placeholder="Password"
          type="password"
        >
          <a-icon
            slot="prefix"
            style="color: rgba(0, 0, 0, 0.25)"
            type="lock"
          />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button
          class="login-form-button"
          html-type="submit"
          type="primary"
          @click="handleSubmit"
        >
          注册
        </a-button>
      </a-form-item>
    </a-form>
    <div>
      Copyright &copy; 王海涛19052164.
      <div>
        <a>Terms of Service</a>
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";
import { notification } from "ant-design-vue";

export default {
  name: "Login",
  data() {
    return {
      hellow: "Hellow",
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          request({
            method: "post",
            url: "/user/" + values.Username + "/" + values.Password,
          })
            .then((response) => {
              console.log(response);
              if (response.status === 200 && response.data === "{ok}") {
                notification.success({
                  message: "新用户已创建",
                  description: "新用户已创建",
                });
              }
              sessionStorage.removeItem("session");
              // this.$router.push("/user/login");
              this.$router.push("/user/register-result");
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.context {
  background-color: #ffffff;
  padding: 0 80px;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: space-between;

  .logo {
    margin-top: 50px;
    margin-bottom: -30px;
    float: left;
    height: 60px;
    width: 60px;
  }

  .title {
    margin-bottom: -70px;

    .back {
      position: absolute;
      left: 80px;
    }
  }
}

@media screen and (max-width: 800px) {
  .login {
    .context {
      width: 100%;
    }

    .ground {
      display: none;
    }
  }
}

#components-form-demo-normal-login .login-form {
  max-width: 300px;
}

#components-form-demo-normal-login .login-form-forgot {
  float: right;
}

#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>
