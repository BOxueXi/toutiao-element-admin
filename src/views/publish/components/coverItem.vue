<template>
  <div class="cover-item" @click="handleClick">
    <img :src="value" alt="">
    <el-dialog title="选择封面" :visible.sync="dialogVisible" width="30%" append-to-body>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="first">
          <img-list @selectItem="selectItem"></img-list>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="second">
          <el-upload class="img-uploader" v-loading="imgLoading" action="" :show-file-list="false" :http-request="handleUpload"
            :before-upload="beforeUpload">
            <img v-if="imageUrl" :src="imageUrl" class="img">
            <i  v-else class="el-icon-plus img-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleOk">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  uploadImg
} from '@/api/images'
import imgList from './imgList.vue'
export default {
  name: 'CoverItem',
  props: ['value'],
  components: {
    imgList
  },
  data () {
    return {
      dialogVisible: false,
      activeName: 'first',
      imageUrl: '',
      imgLoading: false
    }
  },
  watch: {
    activeName (newVal, oldVal) {
      this.imageUrl = ''
    }
  },
  methods: {
    handleClick () {
      this.dialogVisible = true
      console.log(this.value)
    },
    handleUpload ({
      file
    }) {
      this.imgLoading = true
      const formData = new FormData()
      formData.append('image', file)
      uploadImg(formData).then(res => {
        this.imageUrl = res.data.url
        this.$message.success('上传成功')
      }).catch(() => {}).finally(() => {
        this.imgLoading = false
      })
    },
    beforeUpload () {
      return true
    },
    selectItem (item) {
      console.log(item)
      this.imageUrl = item && item.url ? item.url : ''
    },
    handleOk () {
      if (this.imageUrl) {
        this.$emit('input', this.imageUrl)
        this.dialogVisible = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .cover-item {
    width: 200px;
    height: 200px;
    background-color: rgba(#000, 0.2);
    cursor: pointer;
    margin-right: 10px;
    img{
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .img-uploader {
    /deep/ .el-upload {
       position: relative;
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      overflow: hidden;
    }
    .img {
        width: 178px;
        height: 178px;
        display: block;
      }
    .img-uploader-icon {
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
      font-size: 28px;
      color: #8c939d;
    }
  }
</style>
