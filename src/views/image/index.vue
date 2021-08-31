<template>
  <el-card class="image" v-loading='loading'>
    <div class="btns clearfix">
      <div class="left">
        <el-radio-group v-model="isCollected" size="small" @change="handleChange">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
      </div>
      <div class="right">
        <el-button type="success" size="small" @click="handleAddImg">添加素材</el-button>
      </div>
    </div>
    <el-row :gutter="48" class="imgs-box">
      <template v-for="item in imgs">
        <el-col class="img-item" :xs="12" :sm="10" :md="8" :lg="6" :xl="4" :key="item.url">
          <el-image style="height: 180px" :src="item.url" :preview-src-list="item.preview">
          </el-image>
          <div class="handle-btn">
            <i :class="item.is_collected ? 'el-icon-star-on':'el-icon-star-off'" @click="handleCollect(item)"></i>
            <i class="el-icon-delete" @click="handleDel(item)"></i>
          </div>
        </el-col>
      </template>
    </el-row>
    <el-pagination v-bind="paginationOption" :disabled="loading" @size-change="handleSizeChange"
      @current-change="handleCurrentChange">
    </el-pagination>

    <el-dialog title="上传素材" :visible.sync="imgVisible" width="30%" :append-to-body="true">
      <el-upload class="upload-demo" drag action="" :show-file-list="false" :http-request="handleUpload"
        :before-upload="beforeAvatarUpload">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png/gif文件，且不超过2M</div>
      </el-upload>
    </el-dialog>
  </el-card>
</template>

<script>
/**
   * time          2021-8-26 10:23:30 ?F10: PM?
   */
import {
  imgList,
  uploadImg,
  collectImg,
  imgDel
} from '@/api/images'
export default {
  name: 'ImageIndex',
  data () {
    return {
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      loading: false,
      paginationOption: {
        'current-page': 1,
        'page-size': 10,
        total: 0,
        'page-sizes': [10, 20, 30, 40, 50, 100],
        background: true,
        layout: 'total, sizes, prev, pager, next, jumper'
      },
      imgs: [],
      isCollected: false,
      imgVisible: false
    }
  },
  created () {
    this.getImageList()
  },
  methods: {
    // 每页条数改变
    handleSizeChange (val) {
      this.paginationOption['page-size'] = val
      this.paginationOption['current-page'] = 1
      this.getImageList()
    },
    // 当前页改变
    handleCurrentChange (val) {
      this.paginationOption['current-page'] = val
      this.getImageList()
    },
    // 获取图片
    getImageList (params) {
      this.loading = true
      const page = this.paginationOption['current-page']
      const per_page = this.paginationOption['page-size']
      const dataObj = {
        page,
        per_page,
        collect: this.isCollected,
        ...params
      }
      imgList(dataObj).then(res => {
        console.log(res)
        this.imgs = res.data.results.map(item => {
          item.preview = [item.url]
          return item
        })
        this.paginationOption.total = res.data.total_count
        this.paginationOption['page-size'] = res.data.per_page
        this.paginationOption['current-page'] = res.data.page
      }).catch(() => {
        this.imgs = []
      }).finally(() => {
        this.loading = false
      })
    },
    handleChange (collected) {
      this.isCollected = collected
      this.paginationOption['current-page'] = 1
      this.getImageList()
    },
    // 添加素材
    handleAddImg () {
      this.imgVisible = true
    },
    handleUpload ({
      file
    }) {
      const formData = new FormData()
      formData.append('image', file)
      uploadImg(formData).then(res => {
        console.log(res)
        this.imgVisible = false
        this.$message.success('上传成功')
        this.paginationOption['current-page'] = 1
        this.getImageList()
      }).catch(() => {})
    },
    beforeAvatarUpload (file) {
      const isJPG = true
      // if(file.type === 'image/jpeg'){
      //   isJPG = true
      // }else if(file.type === 'image/png'){
      //   isJPG = true
      // }else{
      //   isJPG = false
      // }
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片是 JPG/PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 是否收藏
    handleCollect (item) {
      collectImg(item.id, { collect: !item.is_collected }).then(res => {
        item.is_collected ? this.$message.success('取消收藏成功') : this.$message.success('添加收藏成功')
        this.getImageList()
      })
    },
    // 删除
    handleDel (item) {
      imgDel(item.id).then(res => {
        this.$message.success('删除图片成功')
        this.getImageList()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .left {
    float: left;
  }

  .right {
    float: right;
  }

  .imgs-box {
    margin-top: 20px;

    .img-item {
      position: relative;
      margin-bottom: 24px;
      .handle-btn{
        position: absolute;
        bottom: 0;
        left: 24px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 40px;
        width: calc(100% - 48px);
        background: rgba(0,0,0,.3);
        font-size: 24px;
        color: #fff;
        i{
          cursor: pointer;
        }
        .el-icon-star-on{
          color: red;
        }
      }
    }
  }
</style>
