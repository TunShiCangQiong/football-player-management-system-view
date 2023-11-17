<template>
  <el-form-item
    :label="label"
    :rules="[
      {
        required: required,
        message: '请输入' + label,
        trigger: 'blur',
      },
      {
        pattern: /^\/[\w-/]*$/,
        message: '请输入正确的' + label,
        trigger: 'blur',
      },
    ]"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <el-input v-model="valueVice" clearable></el-input>
  </el-form-item>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true,
    },
    required: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: "路径",
    },
  },
  computed: {
    valueVice: {
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
