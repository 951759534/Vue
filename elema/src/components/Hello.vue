<template>
  <div class="hello">
    <v-header :seller = "seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">  <router-link to="/goods">商品</router-link></div>
      <div class="tab-item"> <router-link to="/ratings">评价</router-link></div>
      <div class="tab-item"> <router-link to="/seller">商家</router-link></div>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
    <div class="footer">
      footer
    </div>
  </div>
</template>

<script>
  import header from './header/header.vue';
   const OK = 0;
  export default {
  name : 'hello',
    components: {
    'v-header' : header
  },
  data () {
    return {
      seller:{}
    }
  },
    created(){
      this.$http.get('/api/seller').then((res)=>{
          res = res.body;
          if(res.errono === OK){
            this.seller = res.data;
          }
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only  添加scoped属性限制css只能在本模板用 -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../common/css/mixin.styl"
    .tab
      display:flex
      height 40px
      width:100%
      border-1px(rgba(7,17,27,.1))
      .tab-item
          flex:1
          text-align:center
          line-height:40px
          &>a     //.tab-item下的a
            text-decoration:none
            display:block
            font-size:14px
            color: rgb(77,85,93)
          .active
            color:rgb(240,20,20)
</style>
