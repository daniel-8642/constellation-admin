<template>
  <div :class="[`nav-theme-${navTheme}`, `nav-layout-${navLayout}`]">
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
      <a-layout-sider
        v-if="navLayout === 'left'"
        :theme="navTheme"
        :trigger="null"
        v-model="collapsed"
        style="width: 200px"
        collapsible
      >
        <div class="logo">星座运势后台</div>
        <SiderMenu :theme="navTheme" />
      </a-layout-sider>
      <a-layout>
        <a-layout-header
          style="display: flex; padding: 0"
          :style="
            navTheme === 'dark' ? 'background: #07162a;' : 'background: #fff'
          "
        >
          <a-icon
            v-if="navLayout === 'left'"
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            :style="navTheme === 'dark' ? 'color: #fff;' : 'color: #07162a;'"
            @click="collapsed = !collapsed"
          ></a-icon>
          <Header style="margin: auto" />
        </a-layout-header>
        <a-layout-content style="margin: 0 16px">
          <router-view></router-view>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          <Footer />
        </a-layout-footer>
      </a-layout>
    </a-layout>
    <Authorized :authority="['admin', 'user']">
      <SettingDrawer />
    </Authorized>
  </div>
</template>

<script>
import Header from "@/layouts/Header";
import Footer from "@/layouts/Footer";
import SiderMenu from "@/layouts/SiderMenu";
import SettingDrawer from "@/components/SettingDrawer";
import Authorized from "@/components/Authorized";

export default {
  name: "BasicLayout",
  data() {
    return {
      collapsed: false,
    };
  },
  components: { Authorized, Footer, SiderMenu, Header, SettingDrawer },
  computed: {
    navTheme() {
      return this.$route.query.navTheme || "dark";
    },
    navLayout() {
      return this.$route.query.navLayout || "left";
    },
  },
};
</script>

<style scoped>
#components-layout-demo-side .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
.trigger {
  padding: 25px 20px;
  position: absolute;
}
.trigger:hover {
  background: #eeeeee;
}

.logo {
  height: 32px;
  line-height: 32px;
  text-align: center;
  overflow: hidden;
}

.nav-theme-dark >>> .logo {
  color: #ffffff;
}

.nav-theme-dark >>> .trigger:hover {
  background: #07162a;
}
</style>
