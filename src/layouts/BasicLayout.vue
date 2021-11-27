<template>
  <div>
    <Header />
    <SiderMenu />
    <Footer />
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "@/layouts/Header";
import Footer from "@/layouts/Footer";
import SiderMenu from "@/layouts/SiderMenu";

export default {
  name: "BasicLayout",
  components: { Footer, SiderMenu, Header },
};
</script>

<style scoped></style>
