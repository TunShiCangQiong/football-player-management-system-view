# 图片预览组件

> 基础语法
```vue
<template>
  <el-button @click="imgViewer">点击预览</el-button>
</template>

<script>
export default {
  methods: {
    imgViewer() {
      this.$imageViewer({
        urlList: [
          "https://caihai123.com/Dribbble/lists/preview_teaser.png",
          "https://caihai123.com/Dribbble/lists/news_teaser.png",
        ],
      });
    },
  },
};
</script>
```
