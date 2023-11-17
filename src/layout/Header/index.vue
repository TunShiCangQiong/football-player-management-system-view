<template>
  <div class="header">
    <div>
      <div class="link" @click="setCollapse(!isCollapse)">
        <i
          :class="{
            'el-icon-s-unfold': isCollapse,
            'el-icon-s-fold': !isCollapse,
          }"
        ></i>
      </div>
      <Breadcrumb />
    </div>
    <div>
      <el-tooltip
        class="link"
        style="height:60px"
        effect="dark"
        content="换肤"
        placement="bottom"
      >
        <el-switch v-model="value"> </el-switch>
      </el-tooltip>

      <div class="link" @click="lock">
        <i class="el-icon-lock"></i>
      </div>

      <Screenfull class="link" />

      <el-dropdown
        class="dropdown link"
        trigger="click"
        @command="handleCommand"
      >
        <span>
          你好，蔡海<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a">个人中心</el-dropdown-item>
          <el-dropdown-item command="b">项目地址</el-dropdown-item>
          <el-dropdown-item command="c" divided>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "./Breadcrumb";
import Screenfull from "./Screenfull";
export default {
  components: { Breadcrumb, Screenfull },
  data() {
    return {
      value: true,
    };
  },
  computed: {
    isCollapse() {
      return this.$store.state.layout.isCollapse;
    },
  },
  watch: {
    value(val) {
      if (val) {
        localStorage.setItem("custom-theme", "");
        this.toggleClass(document.body, "");
      } else {
        localStorage.setItem("custom-theme", "dark-theme");
        this.toggleClass(document.body, "dark-theme");
      }
    },
  },
  created() {
    if (localStorage.getItem("custom-theme") === "dark-theme") {
      this.value = false;
    }
  },
  methods: {
    // 控制侧边栏导航
    setCollapse(collapse) {
      this.$store.commit("setCollapse", collapse);
    },
    toggleClass(element, className) {
      if (!element) {
        return;
      }
      element.className = className;
    },
    // 下拉菜单事件处理
    handleCommand(command) {
      let handle = {
        b: () => {
          window.open("https://github.com/caihai123/vue-clean-admin");
        },
        // 登出
        c: () => {
          this.$router.push("/login");
        },
      };
      handle[command] && handle[command]();
    },
    // 锁屏
    lock() {
      this.$prompt("", "锁屏", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPlaceholder: "请输入锁屏密码",
        inputPattern: /^[A-Za-z0-9!@#$%^&*?]+$/,
        inputErrorMessage: "只能输入英文，数字，特殊字符的组合",
      }).then(({ value }) => {
        this.$store.commit("updateLock", value);
      });
    },
  },
};
</script>

<style scoped lang="scss">
.header {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: $header-link-color;
  background-color: $header-bg;
}
.dark-theme .header {
  color: $dark-header-link-color;
  background-color: $dark-header-bg;
}

.header > div {
  display: flex;
  align-items: center;
}

.link {
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  line-height: 60px;
  font-size: 24px;
  cursor: pointer;
}
.link:hover {
  background: $header-link-hover;
}
.dark-theme .link:hover {
  background: $dark-header-link-hover;
}
.dropdown {
  font-size: 14px;
  color: $header-link-color;
}
.dark-theme .dropdown {
  color: $dark-header-link-color;
}
</style>
