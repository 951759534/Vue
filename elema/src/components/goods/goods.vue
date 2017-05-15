<template>
    <div class="goods">
      {{ goods }}
    </div>
</template>

<script>
  export default {
    name: 'goods',
    data () {
      return {
        goods: 'goods'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only  添加scoped属性限制css只能在本模板用 -->
<style lang="stylus" type="text/css" rel="stylesheet/stylus" scoped>

</style>
