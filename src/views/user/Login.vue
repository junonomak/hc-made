<!--  -->
<template>
  <div>
    <og-bar></og-bar>
    <div class="loginbox">
      <h2 style="margin:0 0 30px 0px">会员登录</h2>
      <el-form :model="form" status-icon ref="form" class="login-form">
        <el-form-item prop="userName">
          <p>请输入用户名:</p>
          <el-input type="text" v-model="form.userName"></el-input>
        </el-form-item>
        <el-form-item prop="pass">
          <p>请输入密码:</p>
          <el-input type="password" v-model="form.pass" autocomplete="off"></el-input>
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
import ogBar from '../../components/common/ogBar.vue'

export default {
  data() {
    return {
      form: {
        userName: '',
        pass: ''
      },
    };
  },

  methods: {
    // 表单提交
    // validate对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
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