<template>
  <keep-alive>
    <Lock v-if="isLock" />

    <el-container v-else class="container">
      <Aside />
      <div
        v-show="!isCollapse"
        class="drawer-bg"
        @click="setCollapse(!isCollapse)"
      ></div>
      <el-container>
        <el-header class="el-header" height="auto">
          <Header />
          <Tabs />
        </el-header>

        <el-main class="main">
          <WaterMark
            :height="36"
            :width="115"
            image="https://gw.alipayobjects.com/zos/bmw-prod/59a18171-ae17-4fc5-93a0-2645f64a3aca.svg"
          >
            <keep-alive :include="include">
              <router-view />
            </keep-alive>
          </WaterMark>
        </el-main>

        <el-backtop target=".main"></el-backtop>
      </el-container>
    </el-container>
  </keep-alive>
</template>

<script>
import Aside from "./Aside";
import Header from "./Header";
import Tabs from "./Tabs";
import Lock from "./Lock";
import WaterMark from "@/components/WaterMark";

export default {
  components: { Aside, Header, Tabs, Lock, WaterMark },
  computed: {
    //控制侧边栏展开收起状态
    isCollapse() {
      return this.$store.state.layout.isCollapse;
    },
    include() {
      return this.$store.getters.include;
    },
    isLock() {
      return this.$store.state.lock.isLock;
    },
  },
  methods: {
    // 控制侧边栏导航
    setCollapse(collapse) {
      this.$store.commit("setCollapse", collapse);
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  position: relative;

  .el-header {
    padding: 0 !important;
  }

  .main {
    height: calc(100vh - 100px);
    text-align: left;
    background-color: $layout-main;
  }

  .drawer-bg {
    display: none;
  }

  @media screen and (max-width: 1200px) {
    .drawer-bg {
      display: block;
      width: 100%;
      height: 100vh;
      position: absolute;
      top: 0;
      background: #000;
      opacity: 0.3;
      z-index: 1999;
    }
  }
}

.dark-theme .container .main {
  background-color: $dark-layout-main;
}
</style>
