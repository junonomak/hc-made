<!--  -->
<template>
  <div>
    <og-bar></og-bar>
    <div class="loginbox">
      <h2 style="margin:0 0 30px 0px">注册会员</h2>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item  prop="userName">
          <p>用户名:</p>
          <el-input v-model="ruleForm.userName"></el-input>
        </el-form-item>
        <el-form-item prop="pass">
          <p>请输入密码:</p>
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <p>确认密码:</p>
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item style="margin-top: 40px;">
          <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {addUser} from '../../network/user.js'

import ogBar from '../../components/common/ogBar.vue'


export default {
    data() {
      var validateUsername = (rule, value, callback) => {
        let a = /^[a-zA-Z0-9_-]{3,16}$/
        if (value === '') {
          callback(new Error('请输入用户名'));
        }
        else if (a.test(value) == false) {
          callback(new Error('用户名必须为3到16位且只能包含（字母，数字，下划线，减号）'));
        }
          callback();
        }
      var validatePass = (rule, value, callback) => {
        let a = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
        if (value === '') {
          callback(new Error('请输入密码'));
        }
        else if (a.test(value) == false) {
          callback(new Error('密码必须包含数字和字母,并且在6~18位之间'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };


      return {
        ruleForm: {
          userName: '',
          pass: '',
          checkPass: ''
        },
        rules: {
          userName: [
            { validator: validateUsername, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      };
    },


    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            addUser(this.ruleForm)
            alert('注册成功!');
            this.$router.go(-1)
          } else {
            alert('请输入正确的账号和密码!');
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },

      registerClick(){
        console.log('aaa');
      }
    },

    components: {
      ogBar
    }
  }
</script>
<style scoped>
.loginbox{
  margin: 75px auto;
  width: 400px;
}

</style>