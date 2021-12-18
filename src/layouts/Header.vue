<template>
  <div :style="navTheme === 'dark' ? 'color: #fff;' : 'color: #07162a;'">
    19052164
    <a class="logout" @click="logout">注销</a>
  </div>
</template>

<script>
export default {
  name: "Header",
  computed: {
    navTheme() {
      return this.$route.query.navTheme || "dark";
    },
  },
  methods: {
    logout() {
      sessionStorage.removeItem("session");
      this.$router.push("/user/login");
    },
  },
};
</script>
<style scoped>
.logout {
  position: absolute;
  right: 30px;
}
</style>
