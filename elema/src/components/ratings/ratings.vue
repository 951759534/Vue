<template>
    <div class="ratings" ref="ratings">
        <div class="ratings-content">
          <div class="overview">
            <div class="overview-left">
              <div class="score">{{seller.score}}</div>
              <div class="title">综合评分</div>
              <div class="rank">高于周边商家{{seller.rankRate}}%</div>
            </div>
            <div class="overview-right">
              <div class="score-wrapper">
                <span class="title">服务态度</span>
                <div class="star-wrapper">
                  <star :size="36" :score="seller.serviceScore"></star>
                </div>
                <span class="score">{{seller.serviceScore}}</span>
              </div>
              <div class="score-wrapper"><span class="title">商品评分</span>
                <div class="star-wrapper">
                  <star :size="36" :score="seller.foodScore"></star>
                </div>
                <span class="score"> {{seller.foodScore}}</span>
              </div>
              <div class="delivery">
                <span class="title">送达时间</span>
                <span class="delivery-content">{{seller.deliveryTime}}</span>
              </div>
            </div>
          </div>
          <split></split>
          <div class="list-header">
            <ratingSelect :ratings="ratings" :select-type="selectType" :desc="desc" :onlyContent="onlyContent" @updateSelectType = "updateSelectType" @switchOnly="switchOnly"></ratingSelect>
          </div>
          <div class="ratings-list">
            <ul>
              <li v-for="rating in ratings" class="rating-item" v-show="needShow(rating.rateType,rating.text)">
                <div class="userImg">
                  <img  :src="rating.avatar" height="56" width="56"/>
                </div>
                <div class="content">
                  <h1 class="name">
                    {{rating.username}}
                  </h1>
                  <div class="star-list">
                    <div class="star-wrapper">
                      <star :size="24" :score="rating.score" ></star>
                    </div>
                    <span class="delivery" v-show="rating.deliveryTime">
                        {{rating.deliveryTime}}分钟送达
                      </span>
                  </div>

                  <p class="text">
                    {{rating.text}}
                  </p>
                  <div class="recommend" v-show="rating.recommend&&rating.recommend.length>0">
                    <i class="icon-thumb_up"></i>
                    <div v-for="re in rating.recommend" class="recommend-thing">{{re}}</div>
                  </div>
                  <div class="time">{{rating.rateTime | formateDate}}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
    </div>
</template>

<script>
  /* eslint-disable no-trailing-spaces */

/*
  *   mock数据中 rateType  0 好评  1 差评
  * **/
  import BScroll from 'better-scroll'
  import star from '@/components/star/star.vue'
  import split from '@/components/split/split.vue'
  import ratingSelect from '@/components/ratingSelect/ratingSelect.vue'
  import { formateDate } from '../../common/js/date'
  const ALL = 2
  const ERRONO = 0
  export default {
    name: 'ratings',
    data () {
      return {
        ratings:[],
        selectType:ALL,
        desc:{
              all: '全部',
              ok : '满意',
              no : '不满意'
        },
        onlyContent:false
      }
    },
    props:{
      seller:{
        type:Object
      }
    },
    components:{
      star,
      split,
      ratingSelect
    },
    methods:{
      updateSelectType(data){
        this.selectType = data
        this.$nextTick(()=>{     //  dom更新后触发
          this.ratingScroll.refresh();
        })
      },
      switchOnly(data){
        this.onlyContent = data
        this.$nextTick(()=>{
          this.ratingScroll.refresh();
        })
      },
      needShow(type, text){
        if(this.onlyContent && !text){ //  判断是否店家只看有内容和评价  如果是过滤没有内容的
          return false;
        }
        if(this.selectType === ALL){ //  判断是否选择全部显示
          return true
        }else{
          return type === this.selectType
        }
      }
    },
    created(){
      this.$http.get('/api/ratings').then((res)=>{
        res = res.body
        if(res.errono === ERRONO){
          this.ratings = res.data;
          this.$nextTick(()=>{
            this.ratingScroll = new BScroll(this.$refs.ratings,
              {
              click:true
            });
          })
        }
      })
    },
    filters:{
      formateDate(date){
        let time = new Date(date);
        return formateDate(time, 'yyyy-MM-dd hh:mm');
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only  添加scoped属性限制css只能在本模板用 -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../../common/css/index.styl"
    .ratings
      position:absolute
      top: 364px
      bottom: 92px
      width:100%
      overflow:hidden
      .overview
        display:flex
        padding: 36px 0
        .overview-left
          flex:0 0 275px
          width: 275px
          border-right: 1px solid rgba(7,17,27,.2)
          text-align:center
          padding:12px 0;
          .score
            line-height: 56px
            font-size: 48px
            color:rgb(255,153,0)
            margin-bottom: 12px
          .title
            font-size: 24px
            color:rgb(7,17,27)
            line-height: 24px
            margin-bottom: 16px
          .rank
            font-size: 20px
            color:rgb(147,153,159)
            line-height: 20px
          @media only screen and (max-width:320px)
            flex:0 0 120px
            width: 120px
        .overview-right
          flex:1
          padding-left: 48px
          .score-wrapper
            line-height: 36px
            font-size:0
            margin-bottom: 16px
            .title
              display:inline-block
              margin-right: 24px
              font-size: 24px
              color:rgb(7,17,27)
              vertical-align:top
            .star-wrapper
              display:inline-block
              margin-right: 24px
              vertical-align:top
            .score
              display:inline-block
              font-size: 24px
              color:rgb(255,153,0)
              line-height: 36px
              vertical-align:top
          .delivery
            .title
              display:inline-block
              margin-right: 24px
              font-size: 24px
              color:rgb(7,17,27)
              vertical-align:top
            .delivery-content
              font-size: 24px
              color:rgb(147,153,159)
              line-height: 36px
          @media only screen and (max-width:320px)
            padding-left: 12px

      .ratings-list
        .rating-item
          padding: 36px
          display:flex
          border-1px(rgba(7,17,27,.2))
          .userImg
            flex: 0 0 56px
            width: 56px
            margin-right: 24px
            img
              border-radius:50%
          .content
            flex: 1
            position:relative
            .name
              line-height: 24px
              font-size: 20px
              color:rgb(7,17,27)
              margin-bottom: 8px
            .star-list
              margin-bottom: 16px
              font-size:0
              .star-wrapper
                display:inline-block
                margin-right: 12px
                vertical-align :top
              .delivery
                display:inline-block
                font-size: 20px
                font-weight:200
                vertical-align :top
                color:rgb(147,153,159)
                line-height: 24px


            .text
              line-height: 36px
              color:rgb(7,17,27)
              font-size: 24px
              margin-bottom: 16px
            .recommend
              line-height: 32px
              font-size:0
              .icon-thumb_up
                display:inline-block
                margin:0 16px 8px 0
                font-size: 18px
                color:rgb(0,160,220)
                line-height: 32px
              .recommend-thing
                display:inline-block
                vertical-align:top
                margin:0 16px 8px 0
                font-size: 18px
                color:rgb(147,153,159)
                border:1px solid rgba(7,17,27,.1)
                box-sizing:border-box
                border-radius:2px
                background:#ffffff
                line-height: 32px
                padding:0 12px
                overflow:hidden
                text-overflow:ellipsis
                word-wrap:nowrap
            .time
              position:absolute
              top:0
              right:0
              line-height: 24px
              font-size: 20px
              color:rgb(147,153,159)
</style>
