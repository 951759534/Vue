<template>
    <div class="seller" ref="seller">
      <div class="seller-content">
        <div class="overview">
          <div class="title">{{seller.name}}</div>
        </div>
        <div class="desc">
          <div class="star">
            <star :size="36" :score="seller.score"></star>
          </div>
          <span class="text">({{seller.ratingCount}}) <span class="selleCount">月售({{seller.sellCount}})单</span> </span>

        </div>
        <div class="favorite">
          <i class="icon-favorite" @click="addFavorite" :class="{'active':favorite}"></i>
          <p class="favorite-text">{{favoriteText}}</p>
        </div>
        <ul class="remark">
          <li class="block">
            <h2 class="title">起送价</h2>
            <div class="content">
              <span class="stress">
                {{seller.minPrice}}
              </span>元
            </div>
          </li>
          <li class="block">
            <h2 class="title">商家配送</h2>
            <div class="content">
              <span class="stress">
                {{seller.deliveryPrice}}
              </span>元
            </div>
          </li>
          <li class="block">
            <h2 class="title">平均配送时间</h2>
            <div class="content">
              <span class="stress">
                {{seller.deliveryTime}}
              </span>分钟
            </div>
          </li>
        </ul>
        <split></split>
        <div class="detail">
          <h2 class="title">
            公告与活动
          </h2>
          <p class="content">
            {{seller.bulletin}}
          </p>
          <ul class="list">
            <li class="list-detail" v-for="(support,index) in seller.supports">
              <span class="icon" :class="classMap[support.type]"></span>
              <span class="text">{{support.description}}</span>
            </li>
          </ul>
        </div>
        <split></split>
        <div class="seller-detail">
          <h2 class="title">商家实景</h2>
          <div  class="detail-wrapper" ref="imgWrapper">
            <ul class="img-wrapper">
              <li class="detail-img" v-for="pic in seller.pics">
                <img  :src="pic"  height="180" width="240px">
              </li>
            </ul>
          </div>
        </div>
        <split></split>
        <div class="seller-message">
          <h2 class="title">
            商家信息
          </h2>
          <ul class="info-wrapper">
            <li class="info" v-for="info in seller.infos">
              {{info}}
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
  /* eslint-disable no-trailing-spaces */

  import star from '@/components/star/star.vue'
  import split from '@/components/split/split.vue'
  import BScroll from 'better-scroll'
  export default {
    name: 'seller',
    data () {
      return {
        classMap : ['decrease ', 'discount', 'special', 'invoice', 'guarantee'],
        favorite:false
      }
    },
    props:{
      seller:{
        type:Object
      }
    },
    components:{
      star,
      split
    },
    created(){
      this.$nextTick(()=>{
        this._initSellerScroll();
        this._initImgScroll();
      })
    },
    methods:{
      _initSellerScroll(){
        if(!this.sellerScroll){
          this.sellerScroll = new BScroll(
            this.$refs.seller,
            {
              click:true
            }
          )
        }else{
          this.sellerScroll.refresh()
        }
      },
      _initImgScroll(){
        this._initImg();
        if(!this.imgScroll){
          this.imgScroll = new BScroll(this.$refs.imgWrapper,
            {
              click:true,
              scrollX:true
            })
        }else{
          this.imgScroll.refresh();
        }
      },
      _initImg(){
        if(this.$refs.imgWrapper.children[0] && this.seller.pics){
          let imgWidth = 240;
          let imgMargin = 12;
          let width = (imgWidth + imgMargin) * this.seller.pics.length
          this.$refs.imgWrapper.children[0].style.width = width + 'px';
        }
      },
      addFavorite(e){
        if(!e._constructed){
          return;
        }
        this.favorite = !this.favorite;
      }
    },
    updated(){  //   解决刷新不能重置
      this._initSellerScroll();
      this._initImgScroll();
    },
    computed:{
      favoriteText(){
        return this.favorite ? '已收藏' : '未收藏'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only  添加scoped属性限制css只能在本模板用 -->
<style lang="stylus"  rel="stylesheet/stylus" scoped>
    @import "../../common/css/index.styl"
    .seller
      position:absolute
      top: 364px
      bottom: 92px
      width:100%
      overflow:hidden
      .overview
        padding: 36px 0 0 36px
        line-height: 28px
        .title
          font-size: 28px
          color:rgb(7,17,27)
          margin-bottom: 16px
      .desc
        padding:0 0 36px 36px
        border-1px(rgba(7,17,27,.2))
        position:relative
        .star
          display:inline-block
        .text
          display:inline-block
          font-size: 20px
          color:rgb(77,85,93)
          vertical-align:top
          line-height: 36px
          margin-left: 16px
          .selleCount
            display:inline-block
            margin-left: 24px
      .favorite
        position:absolute
        right: 36px
        top: 36px
        text-align:center
        .icon-favorite
          display:block
          margin-bottom: 8px
          line-height: 48px
          font-size: 48px
          color:#d4dfd9
          &.active
            color:rgb(240,20,20)
        .favorite-text
          font-size: 20px
          color:rgb(77,85,93)
          line-height: 20px
      .remark
        display:flex
        margin: 36px 0
        .block
          flex:1
          text-align:center
          border-right:1px solid rgba(7,17,27,.2)
          .title
            font-size: 20px
            color:rgb(147,153,159)
            line-height: 20px
          .content
            margin-top: 8px
            .stress
              display:inline-block
              margin-right: 2px
              font-size: 48px
              font-weight:200
              text-align:center
              color:rgb(7,17,27)
              line-height: 48px

      .detail
        padding: 36px 36px 0 36px
        .title
          font-size: 28px
          color:rgb(7,17,27)
          font-weight:500
          line-height: 28px
        .content
          padding:16px 24px 32px 24px
          font-size: 24px
          font-weight:200
          color:rgb(240,20,20)
          line-height: 48px
        .list
          .list-detail
            padding: 32px 24px
            border-top:1px solid rgba(7,17,27,.2)
            .icon
              display:inline-block
              height: 32px
              width: 32px
              background-size:32px 32px
              background-repeat:no-repeat
              &.decrease
                bg-image(decrease_3)
              &.discount
                bg-image(discount_3)
              &.special
                bg-image(special_3)
              &.invoice
                bg-image(invoice_3)
              &.guarantee
                bg-image(guarantee_3)
            .text
              margin-left: 12px
              font-size: 24px
              font-weight:200
              color:rgb(7,17,27)
              line-height: 32px
              vertical-align:top
              overflow:hidden
              text-overflow:ellipsis
              word-wrap:nowrap
      .seller-detail
        padding:36px 0 36px 36px
        font-size:0
        width:100%
        overflow:hidden
        .title
          font-size: 28px
          color:rgb(7,17,27)
          font-weight:500
          line-height: 28px
          margin-bottom: 24px
        .detail-wrapper
          overflow:hidden
          width:100%
          .img-wrapper
            font-size:0
            white-space:nowrap
            .detail-img
              display:inline-block
              margin-right: 12px
              &:last-child
                margin-right: 0
      .seller-message
        padding: 36px
        .title
          font-size: 28px
          color:rgb(7,17,27)
          font-weight:500
          line-height: 28px
        .info-wrapper
          padding:24px 0
          .info
            padding:32px 24px
            border-bottom:1px solid rgba(7,17,27,.2)
            font-size: 24px
            font-weight:200
            color:rgb(7,17,27)
            line-height: 32px
            &:first-child
              border-top:1px solid rgba(7,17,27,.2)
</style>
