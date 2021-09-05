<template>
  <el-card class="fans">
   <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="粉丝列表" name="first">
        <el-row :gutter="16">
          <template v-for="item in tableData">
             <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3" :key="item.id">
               <el-card class="box-card">
                      <el-avatar class="image" :src="item.photo">
                        <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
                      </el-avatar>
                      <div class="name">{{item.name}}</div>
                      <el-button type="primary" size="small" icon="el-icon-plus">关注</el-button>
               </el-card>
               <el-pagination v-bind="paginationOption" :disabled="loading" @size-change="handleSizeChange" @current-change="handleCurrentChange">
               </el-pagination>
             </el-col>
          </template>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="粉丝画像" name="second">粉丝列表</el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
/**
* time          2021-8-26 10:23:53 ?F10: PM?
*/
import { followersList } from '@/api/fans'
export default {
  name: 'Fans',
  data () {
    return {
      paginationOption: {
        'current-page': 1,
        'page-size': 20,
        total: 0,
        'page-sizes': [10, 20, 30, 40, 50, 100],
        background: true,
        layout: 'total, sizes, prev, pager, next, jumper'
      },
      loading: false,
      tableData: [],
      activeName: 'first',
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    }
  },
  created () {
    this.getTableList()
  },
  methods: {
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
        ...params
      }
      followersList(dataObj).then(res => {
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
    handleClick (tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style lang="scss" scoped>
.box-card {
  text-align: center;
  .image {
    // width: 70%;
    // height: 70%;
    // border-radius: 50%;
  }
  .name {
    margin: 10px 0;
    font-size: 13px;
  }
}
</style>
