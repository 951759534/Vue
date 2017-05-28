<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper" >
        <ul>
          <li v-for = "(item,index) in goods" class="menu-item" :class="{'current':index === menuIndex }" @click = "selectMenu(index,$event)">
            <span class="text">   <span v-if=" item.type > 0" class="icon" :class = "classMap[item.type]"></span>{{item.name}}</span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper" >
        <ul>
          <li v-for="item in goods" class="food-list food-list-hook">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li v-for="food in item.foods" class="food-item" @click="selectFood(food,$event)">
                <div class="icon"><img :src="food.icon" width="114" height="114" /></div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now-price">￥{{food.price}}</span>
                    <span v-show="food.oldPrice" class="old-price">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartControl-wrapper">
                    <cartControl :food="food" :bus = "bus" :selectFood="selectFood">
                    </cartControl>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <food :food="selectedFood" ref="foods" :bus = "bus"></food>
    <!--  <shopCart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"  ref="showCart" :bus="bus"></shopCart>-->
    </div>
  </div>
</template>

<script>
  /* eslint-disable spaced-comment,no-trailing-spaces */

  import BScroll from "better-scroll"
  import shopCart from"@/components/shopCart/shopCart.vue"
  import cartControl from "@/components/cartControl/cartControl.vue"
  import food from "@/components/food/food.vue"
  export default {
    name: 'goods',
    components:{
      shopCart,
      cartControl,
      food
    },
    data () {
      return {
        classMap:['decrease ', 'discount', 'special', 'invoice', 'guarantee'],
        listHeight:[],
        scrollY:0,
        menuIndex: 0,
        cartShowFlag:false,
        selectedFood:{}
      }
    },
    props:{
      seller:{
        type:Object
      },
      bus:{
        type:Object
      },
      goods:{
        type:Array
      }
    },
    methods: {
      initScroll(){
         this.menuScroll = new BScroll(this.$refs.menuWrapper, {
           click:true
         })
         this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
           probeType: 3,           //延迟到事件触发完执行
           preventDefault:true,
           deceleration: 0.0001,
           momentum:false,
           click:true
         })
        this.foodsScroll.on("scroll", (pos) =>{
          this.scrollY = Math.abs(Math.round(pos.y));
          this.menuIndex = this.currentIndex;
        })
      },
      calculateHeight(){
        let foodList = this.$refs.foodsWrapper.querySelectorAll(".food-list-hook");
        let height = 0 ;
        this.listHeight.push(height);
        for(let i = 0; i < foodList.length;i++){
          let item = foodList[i];
          height += item.offsetHeight;
          this.listHeight.push(height);
        }
      },
      selectMenu(index, event){
        if(event._constructed){
          return
        }
          this.countIndex = index;
          let foodList = this.$refs.foodsWrapper.querySelectorAll(".food-list-hook");
          let el = foodList[index]
          this.foodsScroll.scrollToElement(el, 0)
          this.menuIndex = index;
      },
      selectFood(food, e){
        if(!e._constructed){
          return;
        }
        this.selectedFood = food
        this.$refs.foods.show();
      }
    },
    created(){
      this.$nextTick(() => {
        this.initScroll();
        this.calculateHeight();    //不要放在update函数中
      })
    },
    computed:{
      currentIndex(){
          let flag = 0
          for (let i = 0; i < this.listHeight.length; i++) {
            let start = this.listHeight[i];
            let end = this.listHeight[i + 1];
            if (!end || ((this.scrollY >= start) && (this.scrollY < end))){
              flag = i
              break;
            }
          }
          return flag;
        }
  }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only  添加scoped属性限制css只能在本模板用 -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../../common/css/index.styl"
    .goods
      display:flex
      position:absolute
      top: 364px
      bottom:92px
      width:100%
      overflow:hidden
      .menu-wrapper
        flex: 0 0 160px
        width:160px  /*兼容性问题*/
        .menu-item
          display:table
          height: 156px
          width: 160px
          line-height: 28px
          background: #f3f5f7
          .text
            display:table-cell
            table-layout:fixed                                /*优化性能*/
            width: 108px
            padding:0 24px 0 24px
            vertical-align:middle
            border-1px(rgba(7,17,27,.1))
            font-size:24px
          .icon
            display:inline-block
            width: 24px
            height: 24px
            vertical-align:top
            tex-align:center
            margin-right: 12px
            background-size: 24px 24px
            background-repeat:no-repeat
            &.decrease
              bg-image('decrease_3')
            &.discount
              bg-image('discount_3')
            &.guarantee
              bg-image('guarantee_3')
            &.invoice
              bg-image('invoice_3')
            &.special
              bg-image('special_3')
          &.current
            position:relative
            z-index:2
            margin-top:-1px
            background:#ffffff;
            font-weight:700
            .text
              border-none()
      .foods-wrapper
        flex:1
        .title
          padding-left: 28px
          height: 52px
          line-height: 52px
          border-left:4px solid #d9dde1
          font-size: 24px
          color:rgb(147,153,159)
          background: #f3f5f7
        .food-item
          display:flex
          margin:36px
          padding-bottom: 36px
          border-1px(rgba(7,17,27,.1))
          &:last-child
            border-none()
            margin-bottom:0
          .icon
            flex:0 0 114px
            width: 114px
            margin-right:20px
          .content
            flex:1
            .name
              margin: 4px 0 16px 0
              line-height: 28px
              font-size: 28px
              color:rgb(7,17,27)
            .desc,.extra
              line-height: 20px
              font-size: 20px
              color:rgb(147,153,159)
              margin-bottom: 16px
            .desc
              line-height: 25px
            .extra
              .count
                margin-right:24px
            .price
              font-size:0
              font-weight:700
              line-height: 48px
              .now-price
                display:inline-block
                font-size: 28px
                color:rgb(240,20,20)
                font-weight:normal/700
                margin-right: 16px
              .old-price
                display:inline-block
                font-size: 20px
                color:rgb(147,153,159)
                font-weight:normal/700
                line-height: 40px
                text-decoration:line-through
            .cartControl-wrapper
              position:absolute
              right:0
              bottom: 24px
</style>
