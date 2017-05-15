<template>
    <div class="title">
      <div class="line"></div>
      <div class="text">{{title}}</div>
      <div class="line"></div>
    </div>
</template>

<script>
  export default {
    name: 'v-title',
    data () {
      return {}
    },
    props:{
      title:{
        type : String
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only  添加scoped属性限制css只能在本模板用 -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .title
    display:flex
    width:80%
    margin:60px auto 48px auto
    .line
      flex:1
      position:relative
      top: -12px
      border-bottom:1px solid rgba(255,255,255,.2)
    .text
      padding:0 24px
      font-weight:700px
      font-size: 28px
</style>
