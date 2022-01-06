<template>
  <div class="context">
    <img alt="logo" class="logo" src="@/assets/code.png" />
    <h2 class="title">用户登录</h2>
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
        <a-checkbox
          v-decorator="[
            'remember',
            {
              valuePropName: 'checked',
              initialValue: true,
            },
          ]"
          style="float: left"
        >
          Remember me
        </a-checkbox>
        <a class="login-form-forgot" @click="forgotpasswd"> Forgot password </a>
        <a-button
          class="login-form-button"
          html-type="submit"
          type="primary"
          @click="handleSubmit"
        >
          Log in
        </a-button>
        Or
        <a @click="$router.push('/user/register')"> register now! </a>
      </a-form-item>
    </a-form>
    <div>
      Copyright &copy; 王海涛19052164.
      <div>
        <a href="https://gitee.com/daniel8642/constellation-fortune-backend"
          >Terms of Service</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import { pullCurrentAuthority } from "@/utils/auth";
import request from "@/utils/request";
import router from "@/router";
import { notification } from "ant-design-vue";
import { sha256, md5, hmac } from "@/utils/crypto";

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
  mounted() {
    if (sessionStorage.getItem("session") !== null) pullCurrentAuthority();
  },
  computed: {
    defaultpasswd() {
      return sessionStorage.getItem("Password");
    },
    defaultusername() {
      return sessionStorage.getItem("Username");
    },
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          if (values.remember) {
            sessionStorage.setItem("Username", values.Username);
            sessionStorage.setItem("Password", values.Password);
          } else {
            sessionStorage.removeItem("Username");
            sessionStorage.removeItem("Password");
          }
          console.log(hmac(values.Password));
          request({
            method: "get",
            url: "/user/login/" + values.Username + "/" + hmac(values.Password),
          })
            .then((response) => {
              sessionStorage.setItem("session", response.data.session);

              let timestamp = new Date().getTime();
              let rand = Math.ceil(100000000000 * Math.random()) + "";
              let sign = sha256(
                md5(sessionStorage.getItem("session")) +
                  timestamp +
                  sessionStorage.getItem("key") +
                  rand
              );
              return request({
                method: "get",
                url: "/user/auth/" + sessionStorage.getItem("session"),
                headers: {
                  timestamp: timestamp,
                  rand: rand,
                  sign: sign,
                },
              });
            })
            .then((response) => {
              console.log(response);
              sessionStorage.setItem("auth", response.data.auth);
              router.push("/");
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    },
    forgotpasswd() {
      notification.open({
        message: "忘记密码",
        description: "本系统属于内部系统,请联系管理员859926750@qq.com重置密码",
        onClick: () => {
          console.log("forgotpasswd Clicked!");
        },
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
    float: right;
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
