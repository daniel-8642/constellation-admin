<template>
  <div class="login">
    <router-view class="context"></router-view>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      hellow: "Hellow",
    };
  },
  mounted() {
    var myDate = new Date();
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
    z-index: 50;
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
