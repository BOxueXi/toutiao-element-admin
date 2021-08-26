<template>
  <el-container class="layout">
    <transition name="aside">
    <el-aside width="auto" class="aside">
      <aside-menu :isCollapse="isCollapse"></aside-menu>
    </el-aside>
    </transition>
    <el-container>
      <el-header class="header">
        <div>
          <i class="collapse" :class="{'el-icon-s-fold':isCollapse,'el-icon-s-unfold': !isCollapse}" @click="handleCollapse"></i>
          <span>
            xxx有限公司
          </span>
        </div>
        <el-dropdown :hide-on-click="false">
          <div class="avatar-box">
            <el-avatar :src="userObj.photo"></el-avatar>
            <span class="avatar-title">{{userObj.name}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting">设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-switch-button" @click.native="handleOut">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
      <!-- <el-footer class="footer">Footer</el-footer> -->
    </el-container>
  </el-container>
</template>

<script>
/**
* time          2021-8-24 10:17:30 ?F10: PM?
*/

import AsideMenu from '@/components/aside'
import { getUserInfo } from '@/api/user'
import { setToken } from '@/utils/helper'
export default {
  name: 'Layout',
  components: {
    AsideMenu
  },
  data () {
    return {
      userObj: {
        name: '前端有小姐姐吗',
        photo: 'http://toutiao-img.itheima.net/FkspBTTgwG0FiKSLUpUKnaYScDTc'
      },
      isCollapse: false
    }
  },
  created () {
    this.getUserAvatarInfo()
  },
  methods: {
    // 获取用户头像
    getUserAvatarInfo () {
      getUserInfo().then(res => {

      })
    },
    // 退出
    handleOut () {
      setToken()
      this.$router.push('/login')
    },
    handleCollapse () {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style lang="scss" scoped>
  .aside-enter-active,
  .aside-leave-active {
    transition: all .3s linear;
  }
.layout {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.aside {
  background-color: #d3dce6;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  .avatar-box{
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    .avatar-title {
      margin: 0 2px 0 10px;
    }
  }
  .collapse {
    cursor: pointer;
  }
}
.main {
  background-color: #E9EEF3;
}
</style>
