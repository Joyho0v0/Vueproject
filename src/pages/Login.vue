<template>
  <div>
    <el-form ref="userInfo" inline label-width="70px" class="login-container" :model="userInfo" :rules="rules">
      <h3 class="login_title">系统登录</h3>
      <el-form-item label="用户名" prop="username">
          <el-input v-model="userInfo.username" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="userInfo.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
  
</template>

<script>
import Mock from 'mockjs'
import Cookie from 'js-cookie'
import {getMenu} from '../api'
export default {
    name:"Login",
    data(){
      return {
        userInfo:{
          username:'',
          password:''
        },
        rules:{
          username: [
            {required:true,trigger:'blur',message:"请输入用户名"}
          ],
          password:[
            {required:true,trigger:'blur',message:"请输入密码"}
          ]
        }
      }
    },
    methods:{
      submit(){
        // token信息
        // const token = Mock.Random.guid()
        // //将token信息存入cookie，用于不同页面的通信
        // Cookie.set('token',token)
        // this.$router.push({name:'home'})

        //校验通过
        this.$refs.userInfo.validate((valid) => {
            if(valid){
               getMenu(this.userInfo).then(({data})=>{
                 console.log(data)
                 if(data.code === 20000){
                   const token = data.data.token
                   Cookie.set('token',token)
                   this.$message({
                      message: data.data.message,
                      type: 'success'
                    });
                    // this.$store.state.userPermission.menuData = data.data.menu
                    this.$store.commit('setMenu',data.data.menu)
                    this.$store.commit('addMenu',this.$router)
                    
                   this.$router.push({name:"home"})
                 }else{
                   this.$message.error(data.data.message)
                 }
               })
              
            }
        })


      }
    }
}
</script>

<style lang="less" scoped>
.login-container {
  width: 420px;
  border: 1px solid #ccc;
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 0 25px #cac6c6;
  box-sizing: border-box;
  .login_title{
    text-align: center;
    margin-bottom: 40px;
    color: #505458;

  }
  .el-input {
    widows: 198px;

  }
  .el-button {
    margin-left: calc(50% + 50px);
    margin-top: 10px;
  }
}
</style>