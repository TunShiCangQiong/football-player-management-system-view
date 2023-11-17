<template>
  <div>
    <h1>这是一个带详情页的菜单</h1>
    <router-link to="/nested/details">点击进入详情</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Nested",
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<!-- <style scoped></style> -->
