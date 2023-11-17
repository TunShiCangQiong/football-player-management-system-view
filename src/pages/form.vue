<template>
  <div>
    <p>
      在我们的项目中免不了会重复使用一些表单项，如下面案例中手机号输入，身份证输入，在我以前的代码中我都是单独定义一个rules文件存放各种规则，使用的时候再单独引用，相当的麻烦。
      所以有了下面这种方式，我觉得应该会很好用。代码在 “@/components/form/” 下
    </p>

    <el-form ref="form" :model="form" label-width="80px" @submit.native.prevent>
      <phone-form-item v-model="form.phone" prop="phone" required />

      <identity-form-item v-model="form.identity" prop="identity" />

      <el-form-item>
        <el-button type="primary" @click="submitForm">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import phoneFormItem from "@/components/form/phone-form-item.vue";
import identityFormItem from "@/components/form/identity-form-item.vue";

export default {
  name: "Form",
  components: { phoneFormItem, identityFormItem },
  data() {
    return {
      form: {
        phone: "",
        identity: "",
      },
    };
  },
  methods: {
    submitForm() {
      this.$refs.form.validate((valid) => {
        console.log(valid);
      });
    },
  },
};
</script>
