<template>
  <div class="login">
    <section>
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
                'userName',
                {
                  rules: [
                    { required: true, message: 'Please input your username!' },
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
                'password',
                {
                  rules: [
                    { required: true, message: 'Please input your Password!' },
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
            <a class="login-form-forgot" href=""> Forgot password </a>
            <a-button
              class="login-form-button"
              html-type="submit"
              type="primary"
            >
              Log in
            </a-button>
            Or
            <a href=""> register now! </a>
          </a-form-item>
        </a-form>
        <div>
          Copyright &copy; 王海涛19052164.
          <div>
            <a>Terms of Service</a>
          </div>
        </div>
      </div>
      <div
        id="image"
        class="ground background-walk-y"
        data-background="https://source.unsplash.com/collection/72610290"
      >
        <div class="text-box">
          <h1 class="hellow">{{ hellow }}</h1>
          Photo from
          <a
            class="links"
            href="https://unsplash.com/collections/72610290/cylink-background-4/dcee63f9371e4819cede4cbbb8474965"
            target="_blank"
            >Unsplash</a
          >
        </div>
      </div>
    </section>
  </div>
</template>

<script>
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
    var myDate = new Date();
    console.log(myDate.getHours());
    switch (myDate.getHours()) {
      case 23:
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        this.hellow = "夜深了,要早点休息呀!";
        break;
      case 6:
      case 7:
      case 8:
      case 9:
        this.hellow = "早上好,今天也是美好的一天!";
        break;
      case 10:
      case 11:
      case 12:
        this.hellow = "中午了,要准时吃饭哟.";
        break;
      case 13:
        this.hellow = "睡个午觉,下午精神更好!";
        break;
      case 14:
      case 15:
      case 16:
      case 17:
      case 18:
      case 19:
        this.hellow = "下午好";
        break;
      case 20:
      case 21:
      case 22:
        this.hellow = "晚上好!";
        break;
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  .context {
    position: absolute;
    height: 100vh;
    width: 500px;
    left: 0;
    top: 0;
    background-color: #ffffff;
    z-index: 50;
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

  .ground {
    position: absolute;
    height: 100vh;
    width: 70%;
    right: 0;
    top: 0;

    background-image: url("https://source.unsplash.com/collection/72610290");

    .text-box {
      height: 250px;
      width: 450px;
      position: absolute;
      right: 0;
      bottom: 0;
      color: #ffffff;

      .hellow {
        color: #ffffff;
        font-size: 50px;
        padding-top: 30px;
        padding-bottom: 60px;
      }

      .links {
        color: #ffffff;
      }
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

.background-walk-y {
  background-repeat: no-repeat;
  background-position: 0 0%;
  animation-name: backgroundWalkY;
  animation-duration: 70s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-fill-mode: forwards;
  animation-timing-function: linear;
  background-size: 100%;
}

@keyframes backgroundWalkY {
  0% {
    background-position: 0 0%;
  }
  100% {
    background-position: 0 100%;
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
