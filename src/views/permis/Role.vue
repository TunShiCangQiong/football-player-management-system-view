<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="Id" align="center" width="220">
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色名称"
        align="center"
        width="220"
      >
      </el-table-column>
      <el-table-column prop="description" label="备注"> </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot="header">
          <el-button
            size="small"
            type="primary"
            icon="el-icon-document-add"
            @click="
              () => {
                $refs.menuListRef && $refs.menuListRef.setCheckedKeys([]);
                visible = true;
              }
            "
          >
            新 增
          </el-button>
        </template>
        <template slot-scope="{ row }">
          <el-button
            size="small"
            type="primary"
            @click="
              () => {
                form = { ...row };
                $refs.menuListRef &&
                  $refs.menuListRef.setCheckedKeys(form.role);
                visible = true;
              }
            "
          >
            编 辑
          </el-button>
          <el-button type="danger" size="small">
            删 除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :visible.sync="visible"
      :title="form.id ? '编辑' : '新增'"
      @closed="resetFields"
    >
      <el-form
        ref="form"
        :model="form"
        label-width="100px"
        label-suffix=":"
        @submit.native.prevent
      >
        <el-form-item
          label="角色名称"
          prop="roleName"
          :rules="[{ required: true, message: '角色名称是必填项！' }]"
        >
          <el-input v-model="form.roleName" clearable />
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            v-model="form.description"
            type="textarea"
            :rows="4"
            maxlength="200"
            show-word-limit
          />
        </el-form-item>

        <el-form-item label="权限配置" required>
          <el-tree
            ref="menuListRef"
            :data="menuList"
            show-checkbox
            node-key="id"
            check-on-click-node
            :props="{
              label: 'title',
            }"
            style="border: 1px solid #DCDFE6;border-radius:4px;"
          >
          </el-tree>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getMenuList, getRoleList } from "@/api/permis";

const defaultForm = {
  id: "",
  roleName: "",
  description: "",
  role: [],
};

export default {
  name: "Role",
  data() {
    return {
      menuList: [],
      tableData: [],
      visible: false,
      form: { ...defaultForm },
    };
  },
  created() {
    getMenuList().then((value) => (this.menuList = value.data.data || []));
    getRoleList().then((value) => (this.tableData = value.data.data || []));
  },
  methods: {
    // 提交表单
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.form.role = this.$refs.menuListRef.getCheckedKeys();
          console.log(this.form);
        }
      });
    },
    // 重置表单
    resetFields() {
      this.$refs.form.resetFields();
      this.form = { ...defaultForm };
    },
  },
};
</script>
