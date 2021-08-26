<template>
  <div class="article">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="特殊资源">
        <el-radio-group v-model="form.status">
          <el-radio label="线上品牌商赞助"></el-radio>
          <el-radio label="线下场地免费"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="form.channel_id" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动时间">
        <el-date-picker v-model="form.date" type="daterange" range-separator="至" start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
/**
   * time          2021-8-26 10:17:58 ?F10: PM?
   */

export default {
  name: 'Article',
  data () {
    return {
      form: {
        status: '',
        channel_id: '',
        date: ''
      }
    }
  },
  methods: {
    onSubmit () {
      console.log(this.form)
    }
  }
}
</script>

<style scoped>

</style>
