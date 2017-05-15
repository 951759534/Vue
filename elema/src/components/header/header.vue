<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="img">
        <img :src="seller.avatar" alt="" width="128" height="128" />
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support" @click = "showDetail" @mouseover="this.stopListRun" @mouseout="this.listRun">
            <ul class="support-lists">
              <transition-group name="list-up"  mode="in-out" >
              <li class="support-list" v-for="(support,index) in seller.supports"  :key="support"  v-show="index === supportIndex">
                <span class="icon" :class="classMap[support.type]"></span>
                <span class="text">{{support.description}}</span>
              </li>
              </transition-group>
            </ul>
        </div>
      </div>
      <div v-if="seller.supports"  class="support-count" @click = "showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click = "showDetail">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <transition name="fade">
      <div class="detail" v-show="detailShow">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <star :size = "48" :score = "seller.score"></star>
            </div>
            <v-title :title= "title[0]"></v-title>
            <ul v-if="seller.supports" class="supports">
              <li class="support-item" v-for="(item,index) in seller.supports">
                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                <span class="text">{{seller.supports[index].description}}</span>
              </li>
            </ul>
            <v-title :title= "title[1]"></v-title>

            <div class="bulletin">
              <p>
                {{seller.bulletin}}
              </p>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="hideDetail">
          <i class="icon-close">
          </i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  /* eslint-disable no-trailing-spaces */
// eslint-disable-next-line quotes
    import star from "../star/star.vue"
    import title from '../title/title.vue'
  export default {
    name: 'headers',
    data () {
      return {
        detailShow:false,
        title:['优惠信息', '商家公告'],
        supportIndex:0
      };
    },
    props: {
      seller: {
        type: Object
      }
    },
    created(){
      this.classMap = [' decrease ', 'discount', 'special', 'invoice', 'guarantee'];
      this.listRun();
    },
    methods:{
      showDetail(){
        this.detailShow = true;
      },
      hideDetail(){
        this.detailShow = false;
      },
      countIndex(){
        this.supportIndex++
        if(this.supportIndex === this.seller.supports.length){
          this.supportIndex = 0;
        }
      },
      listRun(){
       this.listRunFunction = setInterval(this.countIndex, 5000);
      },
      stopListRun(){
        clearInterval(this.listRunFunction);
      }
    },
    computed:{
     },
   components:{
      star,
      'v-title':title
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only  添加scoped属性限制css只能在本模板用 -->
<style lang="stylus"  rel="stylesheet/stylus" scoped>
  @import "../../common/css/index.styl";
  .header
    position:relative
    background:rgba(7,17,27,.5)
    color:#fff
    .content-wrapper
      position:relative
      padding:48px 24px 36px 48px
      font-size:0
      .img
        display:inline-block
        font-size:28px
        vertical-align:top
        img
          border-radius:4px
      .content
        display:inline-block
        margin-left:32px
        font-size:28px
        .title
          margin:4px 0 16px 0
          .brand
            display:inline-block
            vertical-align:top
            width:60px
            height:32px
            bg-image('brand')
            background-size:60px 32px
            background-repeat:no-repeat
          .name
            margin-left:12px
            font-size:32px
            line-height:32px
            font-weight:bold
        .description
          margin-bottom:20px
          line-height:24px
          font-size:24px
        .support
          position:relative
          height:26px
          overflow:hidden
          cursor:pointer
          .support-lists
            .support-list
              position:absolute
              bottom:0
              height:24px
              width: 300px
              white-space:nowrap
              overflow:hidden
              text-overflow:ellipsis
              padding-top:15px
              font-size:20px
              &.list-up-enter-active
                transform translateY(0)
                transition all 1s ease-in-out
              &.list-up-enter
                transform:translateY(100%)
              &.list-up-leave
                transform:translateY(0)
              &.list-up-leave-active
                transform:translateY(-100%)
                transition all 1s ease-in-out
              .icon
                display:inline-block
                width:24px
                height:24px
                margin-right:8px
                vertical-align:top
                background-size:24px 24px
                line-height:24px
                background-repeat:no-repeat
                &.decrease
                  bg-image('decrease_1')
                &.discount
                  bg-image('discount_1')
                &.guarantee
                  bg-image('guarantee_1')
                &.invoice
                  bg-image('invoice_1')
                &.special
                  bg-image('special_1')
              .text
                vertical-align:top
                line-height:24px
                font-size:20px
      .support-count
        position:absolute
        right:24px
        bottom:36px
        padding:14px 16px
        height:24px
        line-height:24px
        border-radius:24px
        background:rgba(0,0,0,.2)
        text-align:center
        cursor:pointer
        .count
          font-size:20px
          vertical-align: top
        .icon-keyboard_arrow_right
          font-size:20px
          line-height:29px
          margin-left:2px
    .bulletin-wrapper
      position:relative
      height:56px
      line-height:56px
      padding:0 52px 0 12px
      text-overflow:ellipsis
      white-space:nowrap
      overflow:hidden
      background-color:rgba(7,17,27,0.2)
      .bulletin-title
        display:inline-block
        width:44px
        height:24px
        line-height:24px
        margin-top:16px
        bg-image('bulletin')
        background-size:44px 24px
        background-repeat:no-repeat
      .bulletin-text
        height:20px
        margin:0 8px
        vertical-align:top
        font-size:20px
      .icon-keyboard_arrow_right
        position:absolute
        font-size:20px
        right:24px
        top:18px
        line-height:20px
    .background
      position:absolute
      top:0
      left:0
      width:100%
      height:100%
      z-index:-1
      filter:blur(10px)
    .detail
      position:fixed
      z-index:2
      top:0
      left:0
      width:100%
      height:100%
      overflow:auto
      transition:all .5s ease-in-out
      opacity:1
      background:rgba(7,17,27,.8)
      &.fade-enter,&.fade-leave-active
        opacity: 0
        background:rgba(7,17,27,.0)
      .detail-wrapper
        width:100%
        min-height:100%
        .detail-main
          margin-top:64px
          padding-bottom:64px
          .name
            line-height:32px
            font-size:32px
            color:rgb(255,255,255)
            height:32px
            text-align:center
            font-weight:700px
          .star-wrapper
            margin-top: 18px
            padding:2px 0
            text-align:center
          .supports
            width:80%
            margin:0 auto
            .support-item
              padding:0 12px
              margin-bottom: 12px
              font-size:0
              &:last-child
                margin-bottom:0
              .icon
                display:inline-block
                width: 32px
                height: 32px
                vertical-align:top
                margin-right: 12px
                background-size: 32px 32px
                background-repeat:no-repeat
                &.decrease
                  bg-image('decrease_2')
                &.discount
                  bg-image('discount_2')
                &.guarantee
                  bg-image('guarantee_2')
                &.invoice
                  bg-image('invoice_2')
                &.special
                  bg-image('special_2')
              .text
                line-height: 32px
                font-size: 24px
          .bulletin
            width:80%
            margin:0 auto
            p
              padding:0 24px
              font-size:24px
              color:rgb(255,255,255)
              line-height:48px
      .detail-close
        position:relative
        width:32px
        height:32px
        margin:-64px auto
        clear:both
        font-size:64px
</style>
