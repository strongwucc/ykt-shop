<template>
  <div class="category-page">
    <div class="first-category" ref="firstCategoryScrollBox">
      <ul class="first-category-list">
        <li class="first-item"
            :class="{active: firstCategoryIndex === activeIndex}"
            v-for="(firstCategory, firstCategoryIndex) in firstCategories"
            :key="firstCategory.pageNum"
            @click.stop="selectFirstCategory(firstCategoryIndex)">
          {{firstCategory.pageName | longStrCut(4)}}
        </li>
      </ul>
    </div>
    <div class="second-category" ref="secondCategoryScrollBox">
      <ul class="second-category-list">
        <li class="second-item" v-for="(secondCategory, secondCategoryIndex) in secondCategories" :key="secondCategoryIndex">
          <div class="second-title" v-if="secondCategory.storeyName">{{secondCategory.storeyName}}</div>
          <div class="second-banner" v-if="secondCategory.storeyType === '0'">
            <swiper auto loop :interval=5000 style="width:100%;margin:0 auto;" height="100px" dots-class="category-dots-bottom">
              <swiper-item v-for="(thirdCategory, thirdCategoryIndex) in secondCategory.storeyPathList" :key="thirdCategoryIndex">
                <img class="banner-img" :src="thirdCategory.pageStoreyPathPictureAddress" @click.stop="secondBannerRedirect(thirdCategory.pageStoreyPathForwordAddress)"/>
              </swiper-item>
            </swiper>
          </div>
          <div class="third-category" v-if="secondCategory.storeyType === '1'">
            <ul class="third-category-list">
              <li
                class="third-item"
                v-for="(thirdCategory, thirdCategoryIndex) in secondCategory.storeyPathList"
                :key="thirdCategoryIndex"
                @click.stop="thirdCategoryRedirect(thirdCategory.pageStoreyPathForwordAddress)">
                <img class="third-category-img" :src="thirdCategory.pageStoreyPathPictureAddress"/>
                <span class="third-category-name">{{thirdCategory.pageStoreyPathName}}</span>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { Swiper, SwiperItem } from 'vux'
import {mapState} from 'vuex'
export default {
  name: 'category',
  components: { Swiper, SwiperItem },
  inject: ['reload'], // 引入方法
  data () {
    return {
      activeIndex: 0,
      firstCategories: [],
      secondCategories: [],
      firstCategoryScroll: null,
      secondCategoryScroll: null
    }
  },
  computed: {
    ...mapState({
    })
  },
  watch: {
  },
  mounted () {
    this.getCategory()
  },
  beforeDestroy () {
    this.firstCategoryScroll.destroy()
    this.secondCategoryScroll.destroy()
    this.firstCategoryScroll = null
    this.secondCategoryScroll = null
  },
  destroyed () {
  },
  methods: {
    initFirstCategoryScroll () {
      if (this.firstCategoryScroll) {
        this.firstCategoryScroll.refresh()
      } else {
        this.firstCategoryScroll = new BScroll(this.$refs.firstCategoryScrollBox, {
          click: true
        })
      }
      return true
    },
    initSecondCategoryScroll () {
      if (this.secondCategoryScroll) {
        this.secondCategoryScroll.refresh()
      } else {
        this.secondCategoryScroll = new BScroll(this.$refs.secondCategoryScrollBox, {
          click: true
        })
      }
    },
    getCategory (categoryId) {
      this.$http.post(this.API.category, {pageNum: categoryId}).then(res => {
        if (res.code === '0000') {
          if (categoryId) {
            this.secondCategories = res.data
            this.$nextTick(() => {
              this.initSecondCategoryScroll()
            })
          } else {
            this.firstCategories = res.data
            this.activeIndex = 0
            this.getCategory(this.firstCategories[0].pageNum)
            this.$nextTick(() => {
              this.initFirstCategoryScroll()
            })
          }
        }
      })
      return true
    },
    selectFirstCategory (firstCategoryIndex) {
      if (this.activeIndex !== firstCategoryIndex) {
        this.activeIndex = firstCategoryIndex
        this.getCategory(this.firstCategories[firstCategoryIndex].pageNum)
      }
    },
    secondBannerRedirect (url) {
      if (url) {
        if (/^http(.*)$/.test(url)) {
          window.location.href = url
        } else {
          window.location.href = 'http://' + url
        }
        return true
      }
      return false
    },
    thirdCategoryRedirect (url) {
      if (url) {
        if (/^http(.*)$/.test(url)) {
          window.location.href = url
        } else {
          window.location.href = 'http://' + url
        }
        return true
      }
      return false
    }
  }
}
</script>

<style lang="less" scoped>
  @import "../assets/css/common";
  .category-page {
    height: 100%;
    background:rgba(255,255,255,1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    .first-category {
      width: 84px;
      height: 100%;
      overflow-y: hidden;
      background:rgba(247,247,247,1);
      .first-category-list {
        .first-item {
          height: 56px;
          line-height: 56px;
          text-align: center;
          font-size: 12px;
          font-weight: 400;
          color: rgba(102,102,102,1);
        }
        .active {
          font-size:14px;
          font-weight:bold;
          color:rgba(214,108,108,1);
          background:rgba(255,255,255,1);
          &:before {
            content: '';
            display: block;
            float: left;
            width: 4px;
            height: 16px;
            background: rgba(214,108,108,1);
            border-radius: 2px;
            margin-top: 20px;
          }
        }
      }
    }
    .second-category {
      /*width: 100%;*/
      flex: 1;
      height: 100%;
      overflow-y: hidden;
      .second-category-list {
        .second-item {
          padding: 24px 16px 0 16px;
          .second-title {
            height:17px;
            font-size:12px;
            font-weight:bold;
            line-height:17px;
            color:rgba(51,51,51,1);
            text-align: left;
            margin-bottom: 8px;
            overflow: hidden;
          }
          .second-banner {
            width: 100%;
            height: 100px;
            border-radius:4px;
            .banner-img {
              width: 100%;
              height: 100px;
              border-radius:4px;
            }
          }
          .third-category {
            width: 100%;
            box-shadow:0px 5px 12px rgba(0,0,0,0.04);
            border-radius:4px;
            padding: 0 7px;
            .third-category-list {
              display: flex;
              justify-content: flex-start;
              align-items: center;
              flex-wrap: wrap;
              .third-item {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                margin-top: 12px;
                margin-left: 32px;
                width: 60px;
                img {
                  width: 60px;
                  height: 60px;
                }
                span {
                  height: 33px;
                  font-size: 11px;
                  font-weight: 400;
                  line-height: 16px;
                  color: rgba(102,102,102,1);
                  margin-top: 4px;
                  text-align: center;
                  overflow: hidden;
                }
              }
              li:nth-child(3n+1) {
                margin-left: 0px;
              }
            }
          }
        }
      }
    }
  }
</style>
