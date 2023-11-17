<template>
  <el-form-item
    :label="label"
    :rules="[
      {
        required: required,
        message: `请输入${label}`,
        trigger: 'blur',
      },
      {
        // 正则出处：https://any86.github.io/any-rule/
        pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
        message: `请输入正确的${label}`,
        trigger: 'blur',
      },
    ]"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <el-input v-model="valueVice" maxlength="11" clearable></el-input>
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
      default: "手机号",
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
