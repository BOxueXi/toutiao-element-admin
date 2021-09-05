<template>
  <div class="img-list">
    <div class="btns clearfix">
      <div class="left">
        <el-radio-group v-model="isCollected" size="small" @change="handleChange">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
      </div>
      <div class="right">
        <!-- <el-button type="success" size="small" @click="handleAddImg">添加素材</el-button> -->
      </div>
    </div>
    <el-row :gutter="48" class="imgs-box">
      <template v-for="(item,index) in imgs">
        <el-col class="img-item" :span="8" :key="item.url" @click.native="handleClick(index)">
          <el-image style="height: 100px" :src="item.url">
          </el-image>
          <div :class="selectIndex=== index? 'selected':''">

          </div>
        </el-col>
      </template>
    </el-row>
    <el-pagination v-bind="paginationOption" :disabled="loading" @size-change="handleSizeChange"
      @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>

<script>
import {
  imgList
} from '@/api/images'
export default {
  name: 'imgList',
  data () {
    return {
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
      imgVisible: false,
      selectIndex: null
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
      this.selectIndex = null
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
    handleClick (index) {
      this.selectIndex = index
      this.$emit('selectItem', this.imgs[this.selectIndex])
    }
  }
}
</script>

<style lang="scss" scoped>
  .img-item {
    position: relative;
  }
  .selected{
    position: absolute;
    top: 0;
    left: 24px;
    width: calc(100% - 48px);
    height: 100px;
    background-color: rgba(#000,0.5);
  }
</style>
