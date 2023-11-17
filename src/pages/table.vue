<template>
  <div class="page">
    <CollapseHead @onSubmit="searchHead" @onReset="resetHead">
      <el-form ref="headForm" :model="head" inline @submit.native.prevent>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="head.name" placeholder="请输入姓名" />
        </el-form-item>
        <PhoneFormItem v-model="head.phone" prop="phone" />
        <IdentityFormItem v-model="head.identity" prop="identity" />
        <EmailFormItem v-model="head.email" prop="email" />
        <el-form-item label="截至日期">
          <el-date-picker
            v-model="head.date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="查询条件" prop="value3">
          <el-input v-model="head.phone" placeholder="请输入" />
        </el-form-item>
      </el-form>
    </CollapseHead>

    <el-form @submit.native.prevent>
      <el-form-item>
        <el-button type="primary" icon="el-icon-plus">新增</el-button>
      </el-form-item>
    </el-form>

    <div class="main">
      <el-table
        v-loading="loading"
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column
          prop="phone"
          label="手机号"
          min-width="110px"
        ></el-table-column>
        <el-table-column
          prop="identity"
          label="身份证"
          min-width="165px"
        ></el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          min-width="190px"
        ></el-table-column>
        <el-table-column prop="email" label="图片" min-width="190px">
          <template slot-scope="{}">
            <el-button
              type="text"
              @click="
                () => {
                  $imageViewer({
                    urlList: [
                      'https://caihai123.com/Dribbble/lists/preview_teaser.png',
                      'https://caihai123.com/Dribbble/lists/news_teaser.png',
                    ],
                  });
                }
              "
            >
              点击预览
            </el-button>
          </template>
        </el-table-column>
        <!-- 表格项太多时 设置操作栏固定在最右侧 -->
        <el-table-column label="操作" fixed="right" width="180">
          <template slot-scope="{}">
            <el-button type="primary" size="mini" icon="el-icon-edit" plain>
              <span>编辑</span>
            </el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete">
              <span>删除</span>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: right;margin-top:20px;">
        <el-pagination
          :current-page="pagination.pageCount"
          :page-size="pagination.pageSize"
          :total="pagination.total"
          @current-change="getTableData"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/utils/axios";
import CollapseHead from "@/components/CollapseHead";
import EmailFormItem from "@/components/form/email-form-item";
import IdentityFormItem from "@/components/form/identity-form-item";
import PhoneFormItem from "@/components/form/phone-form-item";

let backupFormData = null; // 备份的表单数据，只在点击查询或重置时更新

export default {
  // 在一级页面中name为必填项，且必须和router中的name相对应，否则不会有页面缓存
  name: "Table",
  components: {
    CollapseHead,
    EmailFormItem,
    IdentityFormItem,
    PhoneFormItem,
  },
  data() {
    return {
      head: {
        name: "",
        phone: "15555555555",
        identity: "",
        email: "",
        dictValue: "",
        date: [],
      },
      loading: false,
      tableData: [
        {
          id: "1",
          name: "王小虎",
          phone: "15555555555",
          identity: "520122199405085555",
          email: "ch15555555555@163.com",
        },
        {
          id: "1",
          name: "王小虎",
          phone: "15555555555",
          identity: "520122199405085555",
          email: "ch15555555555@163.com",
        },
        {
          id: "1",
          name: "王小虎",
          phone: "15555555555",
          identity: "520122199405085555",
          email: "ch15555555555@163.com",
        },
        {
          id: "1",
          name: "王小虎",
          phone: "15555555555",
          identity: "520122199405085555",
          email: "ch15555555555@163.com",
        },
        {
          id: "1",
          name: "王小虎",
          phone: "15555555555",
          identity: "520122199405085555",
          email: "ch15555555555@163.com",
        },
        {
          id: "1",
          name: "王小虎",
          phone: "15555555555",
          identity: "520122199405085555",
          email: "ch15555555555@163.com",
        },
        {
          id: "1",
          name: "王小虎",
          phone: "15555555555",
          identity: "520122199405085555",
          email: "ch15555555555@163.com",
        },
        {
          id: "1",
          name: "王小虎",
          phone: "15555555555",
          identity: "520122199405085555",
          email: "ch15555555555@163.com",
        },
        {
          id: "1",
          name: "王小虎",
          phone: "15555555555",
          identity: "520122199405085555",
          email: "ch15555555555@163.com",
        },
        {
          id: "1",
          name: "王小虎",
          phone: "15555555555",
          identity: "520122199405085555",
          email: "ch15555555555@163.com",
        },
      ],
      pagination: {
        pageCount: 1,
        pageSize: 10,
        total: 0,
      },
    };
  },
  created() {
    // this.searchHead()
  },
  methods: {
    // 根据当前head表单数据查询第一页
    searchHead() {
      backupFormData = JSON.parse(JSON.stringify(this.head));
      this.getTableData(1);
    },

    // 获取表格（list）数据
    getTableData(page) {
      this.loading = true;
      axios
        .post("", {
          pageCount: page || this.pagination.pageCount,
          pageSize: this.pagination.pageSize,
          ...backupFormData,
        })
        .then((value) => {
          const data = value.data;
          this.tableData = data.list || [];
          this.pagination.pageCount = data.pageCount;
          this.pagination.total = data.total;
          this.loading = false;
        })
        .finally(() => {
          this.loading = false;
        });
    },

    // 重置搜索栏
    resetHead() {
      this.$refs["headForm"].resetFields();
      this.searchHead();
    },
  },
};
</script>
