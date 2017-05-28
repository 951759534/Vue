<template>
  <div class="hello">
    <v-header :seller = "seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">  <router-link to="/goods">商品</router-link></div>
      <div class="tab-item"> <router-link to="/ratings">评价</router-link></div>
      <div class="tab-item"> <router-link to="/seller">商家</router-link></div>
    </div>
    <div class="content">
      <router-view :seller = "seller" :goods="goods" :bus = "bus"></router-view>
    </div>
    <div class="footer">
      <shopCart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"  ref="showCart" :bus="bus"></shopCart>
    </div>
  </div>
</template>

<script>
  import header from '@/components/header/header.vue';
  import shopCart from '@/components/shopCart/shopCart.vue'
  import Vue from 'vue';
   const OK = 0;
  export default {
  name : 'hello',
    components: {
    'v-header' : header,
      shopCart
  },
  data () {
    return {
      seller:{},
      goods:[],
      bus:new Vue()
    }
  },
    created(){
      this.$http.get('/api/seller').then((res)=>{
          res = res.body;
          if(res.errono === OK){
            this.seller = res.data;
          }
    })
      this.$http.get('/api/goods').then((res)=>{
          res = res.body;
          if(res.errono === OK){
            this.goods = res.data;
          }
      })
    },
    computed:{
      selectFoods(){
        let foods = [];
        this.goods.forEach((good)=>{
          good.foods.forEach((food)=>{
            if(food.count){
              foods.push(food)
            }
          })
        })
        return foods
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only  添加scoped属性限制css只能在本模板用 -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../common/css/mixin.styl"
    .tab
      display:flex
      height 80px
      width:100%
      border-1px(rgba(7,17,27,.1))
      .tab-item
          flex:1
          text-align:center
          line-height:80px
          &>a     //.tab-item下的a
            text-decoration:none
            display:block
            font-size:28px
            color: rgb(77,85,93)
          .active
            color:rgb(240,20,20)
</style>
