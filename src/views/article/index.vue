<template>
  <el-card class="article">
    <!-- <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb> -->

    <el-form ref="search" :model="search" label-width="80px">
      <el-row :gutter="16">
        <el-col :span="6">
          <el-form-item label="状态">
            <el-select v-model="search.status" placeholder="请选择" clearable>
              <el-option v-for="item in status" :label="item.displayName" :value="item.value" :key="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="频道">
            <el-select v-model="search.channel_id" placeholder="请选择" clearable>
              <el-option v-for="item in channels" :label="item.name" :value="item.id" :key="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="日期">
            <el-date-picker v-model="search.date" type="daterange" range-separator="至" start-placeholder="开始日期"
              end-placeholder="结束日期" value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-button type="primary" @click="handleSearch">筛选</el-button>
            <el-button @click="handleResetSearch">清空</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- <standard-table></standard-table> -->
    <el-table :data="tableData" border class="table-list" v-loading="loading">
      <el-table-column type="index" :index="indexMethod" width="50" label="序号">
      </el-table-column>
      <el-table-column prop="date" label="封面">
        <template slot-scope="{row,$index}">
          <img v-if="row.cover.images.length" class="preview-img" :src="row.cover.images[0]"
            @click="handlePreview($index)">
          <img v-else class="preview-img" src="../../assets/img/error.gif">
          <viewer :ref="'viewer' + $index" class="viewer" :images="row.cover.images" v-show="false">
            <img v-for="(src,index) in row.cover.images" :src="src" :key="index">
          </viewer>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题">
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="{row}">
          <template v-for="item in status">
            <el-tag size="medium" v-if="item.value === row.status" :key="item.value" :color="colors[row.status]">{{item.displayName}}
            </el-tag>
          </template>
        </template>
      </el-table-column>
      <el-table-column prop="pubdate" label="发布时间">
      </el-table-column>
      <el-table-column label="操作">
         <template slot-scope="{row}">
           <el-button icon="el-icon-edit" size="small" @click="handleEdit(row)">修改</el-button>
           <el-button icon="el-icon-delete" size="small" @click="handleDel(row)">删除</el-button>
         </template>
      </el-table-column>
    </el-table>
    <el-pagination v-bind="paginationOption" :disabled="loading" @size-change="handleSizeChange" @current-change="handleCurrentChange">
    </el-pagination>
  </el-card>
</template>

<script>
/**
   * time          2021-8-26 10:17:58 ?F10: PM?
   */
import Vue from 'vue'
import {
  getArticleList,
  getChannels,
  articleDel
} from '@/api/article'
  // import standardTable from '@/components/table/StandardTable'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
Vue.use(Viewer, {
  defaultOptions: {
    zIndex: 9999
  }
})
export default {
  name: 'Article',
  components: {
    // standardTable
    // Viewer
  },
  data () {
    return {
      search: {
        status: '',
        channel_id: '',
        date: []
      },
      tableData: [],
      paginationOption: {
        'current-page': 1,
        'page-size': 10,
        total: 0,
        'page-sizes': [10, 20, 30, 40, 50, 100],
        background: true,
        layout: 'total, sizes, prev, pager, next, jumper'
      },
      loading: false,
      channels: [],
      status: [{
        value: 0,
        displayName: '草稿'
      },
      {
        value: 1,
        displayName: '待审核'
      },
      {
        value: 2,
        displayName: '审核通过'
      },
      {
        value: 3,
        displayName: '审核失败'
      },
      {
        value: 4,
        displayName: '已删除'
      }
      ],
      colors: ['red', 'cyan', 'orange', 'green', 'pink', 'blue', 'purple', 'pink', 'red', 'orange', 'green', 'cyan',
        'blue', 'purple'
      ]
    }
  },
  created () {
    this.getChannelsData()
    this.getTableList()
  },
  methods: {
    // 自定义序号
    indexMethod (index) {
      const pageNum = this.paginationOption['current-page'] || 1
      const pageSize = this.paginationOption['page-size'] || 100
      return (pageNum - 1) * pageSize + 1 + index
    },
    // 每页条数改变
    handleSizeChange (val) {
      this.paginationOption['page-size'] = val
      this.paginationOption['current-page'] = 1
      this.getTableList()
    },
    // 当前页改变
    handleCurrentChange (val) {
      this.paginationOption['current-page'] = val
      this.getTableList()
    },
    // 根据条件查询
    handleSearch () {
      this.paginationOption['current-page'] = 1
      this.getTableList()
    },
    // 清空查询条件
    handleResetSearch () {
      this.search = {}
      this.paginationOption['current-page'] = 1
      this.getTableList()
    },
    // 列表数据
    getTableList (params) {
      this.loading = true
      if (this.search.date && this.search.date.length) {
        this.search.begin_pubdate = this.search.date[0]
        this.search.end_pubdate = this.search.date[1]
      }
      const page = this.paginationOption['current-page']
      const per_page = this.paginationOption['page-size']
      const dataObj = {
        page,
        per_page,
        ...this.search,
        ...params
      }
      getArticleList(dataObj).then(res => {
        console.log(res)
        this.tableData = res.data.results
        this.paginationOption.total = res.data.total_count
        this.paginationOption['page-size'] = res.data.per_page
        this.paginationOption['current-page'] = res.data.page
      }).catch(() => {
        this.tableData = []
      }).finally(() => {
        this.loading = false
      })
    },
    // 修改
    handleEdit (row) {
      this.$router.push('/publish?id=' + row.id)
    },
    // 删除
    handleDel (row) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        articleDel(row.id.toString()).then(res => {
          this.getTableList()
          this.$message.success('删除成功!')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 获取频道
    getChannelsData () {
      getChannels().then(res => {
        console.log(res)
        this.channels = res.data.channels
      }).catch(() => {
        this.channels = []
      })
    },
    // 封面预览
    handlePreview (index) {
      this.$refs['viewer' + index].$viewer.show()
    }
  }
}
</script>

<style lang="scss" scoped>
  .table-list {
    margin-bottom: 10px;
  }

  .preview-img {
    width: 150px;
    height: 100px;
    cursor: pointer;
  }
</style>
