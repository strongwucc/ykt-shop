<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />
  </div>
</template>

<script>
export default {
  name: 'App',
  provide () { // 注册一个方法
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';
  #app {
    font-family: PingFang SC;
    /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #333333;
    background-color: #F2F4F7;
    height: 100%;
    /* 分类页面轮播图 dots 样式 */
    .category-page .second-banner .vux-slider {
      border-radius: 4px;
    }
    .category-dots-bottom {
      bottom: 8px;
      a {
        height: 10px;
        line-height: 10px;
        i {
          width: 4px;
          height: 4px;
          background: rgba(255,255,255,1);
          border-radius: 50%;
          opacity: 0.7;
        }
        i.active {
          opacity: 1;
        }
      }
    }
  }
</style>
