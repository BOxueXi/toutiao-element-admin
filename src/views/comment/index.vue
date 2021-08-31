<template>
  <el-card class="comment">
    <!-- <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb> -->
    <el-table :data="tableData" border class="table-list" v-loading="loading">
      <el-table-column type="index" :index="indexMethod" width="50" label="序号">
      </el-table-column>
      <el-table-column prop="title" label="标题">
      </el-table-column>
      <el-table-column prop="total_comment_count" label="总评论数">
      </el-table-column>
      <el-table-column prop="fans_comment_count" label="粉丝评论数">
      </el-table-column>
      <el-table-column prop="comment_status" label="状态">
        <template slot-scope="{row}">
          <template v-if="row.comment_status">
            <span>正常</span>
          </template>
           <template v-else>
             <span>关闭</span>
           </template>
        </template>
      </el-table-column>
      <el-table-column label="操作">
         <template slot-scope="{row}">
           <el-button v-if="row.comment_status" type="danger" size="small" @click="handleOpenOrClose(row)">关闭评论</el-button>
           <el-button v-else type="success" size="small" @click="handleOpenOrClose(row)">打开评论</el-button>
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
import {
  getCommentList,
  commentOpenOrClose
} from '@/api/comment'

export default {
  name: 'Comment',
  components: {
  },
  data () {
    return {
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
      colors: ['red', 'cyan', 'orange', 'green', 'pink', 'blue', 'purple', 'pink', 'red', 'orange', 'green', 'cyan',
        'blue', 'purple'
      ]
    }
  },
  created () {
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
    // 列表数据
    getTableList (params) {
      this.loading = true
      const page = this.paginationOption['current-page']
      const per_page = this.paginationOption['page-size']
      const dataObj = {
        page,
        per_page,
        response_type: 'comment',
        ...params
      }
      getCommentList(dataObj).then(res => {
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
    handleOpenOrClose (row) {
      let message = ''
      if (row.comment_status) {
        message = '亲，您是否要关闭当前文章评论功能，如果关闭读者将无法对这篇文章进行评论。'
      } else {
        message = '亲，您是否要打开当前文章评论功能。'
      }
      this.$confirm(message, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(row)
        commentOpenOrClose({
          article_id: row.id.toString()
        }, {
          allow_comment: row.comment_status
        }).then(res => {
          this.getTableList()
          row.allow_comment ? this.$message.success('关闭评论成功') : this.$message.success('打开评论成功')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
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
        // articleDel(row.id.toString()).then(res => {
        //   this.getTableList()
        //   this.$message.success('删除成功!')
        // })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
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
