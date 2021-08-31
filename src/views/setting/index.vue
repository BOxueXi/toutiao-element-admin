<template>
  <el-card class="setting">
    <el-row>
      <el-col :span="12">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="编号">
            {{form.id}}
          </el-form-item>
          <el-form-item label="手机">
            {{form.mobile}}
          </el-form-item>
          <el-form-item label="媒体名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="媒体介绍">
            <el-input type="textarea" v-model="form.intro"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存设置</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12">
        <div class="avatar-uploader" @click="$refs.file.click()">
          <el-avatar shape="square" :size="200" fit="fit" :src="photo"></el-avatar>
          <p>修改头像</p>
        </div>

        <input id="file" ref='file' type="file" @change="handleChange" hidden="true" />
      </el-col>
    </el-row>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      append-to-body
      width="30%">
      <img :src="preImage" alt="" width="100%">
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
/**
   * time          2021-8-26 10:17:58 ?F10: PM?
   */
import { getUserData } from '@/api/user'
export default {
  name: 'Setting',
  components: {
  },
  data () {
    return {
      form: {
        email: '',
        id: '',
        intro: '',
        mobile: '',
        name: ''
      },
      photo: '',
      preImage: '',
      dialogVisible: false
    }
  },
  created () {
    this.getUserInfoData()
  },
  methods: {
    onSubmit () {

    },
    // 回填数据
    getUserInfoData () {
      getUserData().then(res => {
        console.log(res)
        this.form = res.data
        this.photo = res.data.photo
      })
    },
    // 选择图片
    handleChange () {
      console.log(121)
      this.dialogVisible = true
      const file = this.$refs.file
      const blobData = window.URL.createObjectURL(file.files[0])
      this.preImage = blobData
      this.$refs.file.value = '' // 处理选择的文件不变的情况
    }
  }
}
</script>

<style lang="scss" scoped>
  .avatar-uploader {
    text-align: center;
    cursor: pointer;
  }
</style>
