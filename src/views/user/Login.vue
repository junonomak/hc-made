<!--  -->
<template>
  <div>
    <og-bar></og-bar>
    <div class="loginbox">
      <h2 style="margin:0 0 30px 0px">会员登录</h2>
      <el-form :model="form" status-icon ref="form" class="login-form">
        <el-form-item prop="userName">
          <p>请输入用户名:</p>
          <el-input type="text" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item prop="pass">
          <p>请输入密码:</p>
          <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item style="margin-top: 40px;">
          <el-button type="primary" @click="submitForm('form')">提交</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </el-form>
      <div @click="registerClick" style="cursor: pointer; margin-top: 40px;">没有HC-made会员？请点击该处注册</div>
    </div>
  </div>
</template>

<script>
import {getuseraccount} from '../../network/getuser'
import ogBar from '../../components/common/ogBar.vue'

export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
    };
  },

  methods: {
    // 表单提交
    // validate对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise
    submitForm(formName) {
      // console.log(this.form.username);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 数据库拿到username所对应的password后
          // 向vuex中传入一个登录状态数据,通过vuex来控制账号是否登进或者登出
          // 同时router设置一个路由导航,每次访问usercenter的时候就进行路由重定向
          getuseraccount(this.form.username).then(res => {
          if(this.form.password === res.data[0].password){
            this.$store.commit('LoginIn', this.form.username)
            this.$router.go(-1)
            alert('登录成功!');
          }else{
            alert('账号不存在或者密码输入错误!');
          }
          })
          
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    // 表单重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.form.userName = ''
      console.log(this.form);
    },

    // 注册跳转
    registerClick(){
      this.$router.push('/register')
    },
  },

  components: {
    ogBar
  },
}
</script>
<style scoped>
.loginbox{
  margin: 75px auto;
  width: 400px;
}

</style>