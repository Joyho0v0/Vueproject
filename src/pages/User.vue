<template>
  <div class="manage">
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width="50%"
    >
      <!-- 用户的表单信息 -->
      <el-form
        :inline="true"
        :rules="rules"
        ref="form"
        :model="form"
        label-width="80px"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="form.age" placeholder="请输入年龄"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
          <el-date-picker
            v-model="form.birth"
            type="date"
            placeholder="请选择日期"
            value-format="yyyy-MM-DD"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="form.address" placeholder="请输入地址"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancle">取消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <div class="manage-header">
      <el-button @click="handleAdd" type="primary">+ 新增</el-button>
      <el-form :model="search" inline>
            <el-form-item>
                <el-input placeholder="请输入名称" v-model="search.name"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
      </el-form>
    </div>
    <div class="common-table" >
        <el-table 
            :stripe="true"
            :data="tableData" 
            style="width: 100%" 
            height="90%">
            <el-table-column prop="name" label="姓名"> </el-table-column>
            <el-table-column prop="sex" label="性别">
                <template slot-scope="scope">
                <span style="margin-left: 10px">{{
                    scope.row.date == 1 ? "男" : "女"
                }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="age" label="年龄"> </el-table-column>
            <el-table-column prop="birth" label="出生日期"> </el-table-column>
            <el-table-column prop="address" label="地址"> </el-table-column>
            <el-table-column prop="option" label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDel(scope)"
                        >删除</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
        <div class="pager">
            <el-pagination
                layout="prev,pager,next"
                :total="total"
                @current-change="handlePage"
            >
            </el-pagination>
        </div>
    </div>
  </div>
</template>

<script>
import { getUser, addUser, editUser, delUser } from "../api";
export default {
  name: "User",
  data() {
    return {
      dialogVisible: false,
      form: {
        name: "",
        age: "",
        sex: "",
        birth: "",
        address: "",
      },
      search: {
          name:""
      },
      tableData: [],
      pageData: {
        page: 1,
        limit: 10,
      },
      total: 0, //当前table中数据的数目
      modalType: 0, //0表示新增，1表示编辑
      rules: {
        name: [{ required: true, message: "请输入姓名" }],
        age: [{ required: true, message: "请输入年龄" }],
        sex: [{ required: true, message: "请选择性别" }],
        birth: [{ required: true, message: "请选择出生日期" }],
        address: [{ required: true, message: "请填写地址" }],
      },
    };
  },
  methods: {
    //选择页码的回调函数
    handlePage(val) {
      console.log("开始跳转");
      this.pageData.page = val;
      console.log(this.pageData);
      this.getList(this.pageData);
    },
    handleClose() {
      this.$refs.form.resetFields();
      this.dialogVisible = false;
    },
    handleEdit(row) {
      console.log("row", row);
      this.modalType = 1;
      this.dialogVisible = true;
      //    需要对当前数据进行深拷贝，否则会出错
      this.form = JSON.parse(JSON.stringify(row.row));
    },
    handleDel(row) {
      //   console.log('delrow',row)
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delUser(row.row.id).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    getList() {
        console.log(this.search,'search')
      //获取列表数据
      getUser({ params: {...this.search , ...this.pageData} }).then(({ data }) => {
        console.log(data);
        this.tableData = data.list;
        this.total = data.count || 0;
      });
    },
    //   提交
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          //后续提交操作
          if (this.modalType === 0) {
            addUser(this.form).then(() => {
              //重新获取列表数据
              this.getList();
            });
          } else {
            editUser(this.form).then(() => {
              this.getList();
            });
          }
          //关闭弹窗
          this.$refs.form.resetFields();
          this.dialogVisible = false;
        }
      });
    },
    cancle() {
      this.handleClose();
    },
    handleAdd() {
      this.dialogVisible = true;
      this.modalType = 0;
    },
    //列表的查询
    onSubmit() {
        this.getList()
    }
  },
  mounted() {
    //获取列表
    this.getList();
  },
};
</script>

<style lang="less" scoped>
.manage {
  height: 90%;
  .manage-header {
      display: flex; 
      justify-content: space-between;
      align-items: center;
  }
}
.common-table {
    position: relative;
    height: calc(100% - 62px);
    .pager {
        position: absolute;
        bottom:0;
        right: 20px;
    }
}
</style>