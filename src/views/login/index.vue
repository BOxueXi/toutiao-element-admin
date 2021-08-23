<template>
  <div class="login">
    <el-form class="login-form" ref="form" :model="form" :rules="rules">
      <img class="login-logo" src="../../assets/img/logo_index.png" />
      <el-form-item prop='mobile'>
        <el-input v-model="form.mobile">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop='code'>
        <el-input v-model="form.code">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop='xieyi'>
        <el-checkbox v-model="form.xieyi">我已阅读并同意用户协议和隐私条款</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button class="btn" type="primary" @click="handleLogin('form')" :loading="loading">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {login} from '@/api/login'
  export default {
    name: 'Login',
    data() {
      return {
        form: {
          mobile: '13911111111',
          code:'246810',
          xieyi: ''
        },
        rules: {
         mobile: [{ required: true, message: '手机号码必填', trigger: 'blur' }],
         code: [{required: true, message: '校验码必填', trigger: 'blur'}],
         xieyi: [{required: true, message: '必选', trigger: 'change'}]
        },
        loading: false
      }
    },
    methods: {
      handleLogin(formName) {
              this.$refs[formName].validate((valid) => {
                if (valid) {
                  this.loading = true
                  login(this.form).then(res=>{
                    console.log(res)
                  }).finally(()=>{
                    this.loading = false
                  })
                }
              });
          }
    }
  }
</script>

<style lang="scss" scoped>
  .login {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: url(../../assets/img/login_bg.jpg) no-repeat;
    background-size: cover;
    .login-form{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      width: 400px;
      height: 340px;
      padding: 0 50px 50px;
      box-sizing: border-box;
      background-color: #fff;
     text-align: center;
      .login-logo{
        width: 50%;
        margin: 14px 0;
      }
      .btn {
        width: 100%;
        font-size: 16px;
      }
    }
  }
</style>
