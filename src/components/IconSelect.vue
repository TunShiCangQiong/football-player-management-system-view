<template>
  <el-select
    v-model="icon"
    class="icon-select"
    filterable
    placeholder="请选择图标"
    clearable
    :popper-append-to-body="false"
    popper-class="popper-box"
  >
    <el-tabs type="border-card">
      <el-tab-pane label="el-icon">
        <div class="search-box">
          <el-input
            suffix-icon="el-icon-search"
            placeholder="在此搜索图标"
            style="max-width: 300px"
          ></el-input>
        </div>

        <div class="icon-box">
          <el-option
            v-for="item in elIconList"
            :key="item"
            :value="item"
            class="icon-item"
          >
            <i :class="item"></i>
          </el-option>
        </div>
      </el-tab-pane>
      <el-tab-pane label="iconfont">
        <div class="search-box">
          <el-input
            suffix-icon="el-icon-search"
            placeholder="在此搜索图标"
            style="max-width: 300px"
          ></el-input>
        </div>

        <div class="icon-box">
          <el-option
            v-for="item in IconfontList"
            :key="item"
            :value="item"
            class="icon-item"
          >
            <i :class="item"></i>
          </el-option>
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-select>
</template>

<script>
import elIconList from "@/utils/iconfont/el-icon";
import IconfontList from "@/utils/iconfont/iconfont";

export default {
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      elIconList: elIconList,
      IconfontList: IconfontList,
    };
  },
  computed: {
    icon: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
};
</script>

<style scoped>
.icon-select >>> .popper-box {
  width: 0;
  padding: 10px;
}
.icon-select >>> .el-select-dropdown__wrap {
  min-height: 500px;
}
.icon-select >>> .icon-box {
  display: flex;
  flex-wrap: wrap;
  overflow-x: auto;
  max-height: 348px;
}
.icon-select >>> .icon-item {
  font-size: 24px;
}
.icon-select >>> .search-box {
  padding-bottom: 10px;
}
</style>
