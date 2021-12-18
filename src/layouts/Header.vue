<template>
  <div :style="navTheme === 'dark' ? 'color: #fff;' : 'color: #07162a;'">
    19052164
    <a class="logout" @click="$router.push('/user/login')">注销</a>
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
};
</script>
<style scoped>
.logout {
  position: absolute;
  right: 30px;
}
</style>
