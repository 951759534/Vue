<template>
    <div class="star" :class="starType">
      <span v-for="(itemClass,index) in itemClasses" :class="itemClass" class="star-item"
            ></span>
    </div>
</template>

<script>
  /* eslint-disable no-trailing-spaces */
  const LENGTH = 5;
  const CLS_ON = 'on';
  const CLS_HALF = 'half';
  const CLS_OFF = 'off';
  export default {
    name: '',
    props:{
        size:{
          type: Number
        },
      score:{
          type: Number
        }
    },
    data () {
      return {}
    },
    computed :{
        starType(){
          return 'star-' + this.size;
        },
      itemClasses(){
          let result = [];
          let score = Math.floor(this.score * 2) / 2;
          let hasDecimal = (score % 1 !== 0);
          let integer = Math.floor(score);
          for(let i = 0;i < integer;i++){
            result.push(CLS_ON);
          }
          if(hasDecimal){
              result.push(CLS_HALF);
          }
          while(result.length < LENGTH){
            result.push(CLS_OFF);
          }
          return result;
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only  添加scoped属性限制css只能在本模板用 -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/css/mixin.styl";
      .star
        font-size:0
        .star-item
          display:inline-block
          background-repeat:no-repeat
        &.star-48
          .star-item
            width: 40px
            height: 40px
            margin-right: 22px
            background-size:40px 40px
            &.on
              bg-image("star48_on")
            &.half
              bg-image("star48_half")
            &.off
              bg-image("star48_half")
            &:last-child
              margin-right:0



        &.star-36
          .star-item
            width: 30px
            height: 30px
            margin-right: 12px
            background-size:30px 30px
            &.on
              bg-image("star36_on")
            &.half
              bg-image("star36_half")
            &.off
              bg-image("star36_half")
            &:last-child
              margin-right:0


        &.star-24
          .star-item
            width: 24px
            height: 24px
            margin-right: 6px
            background-size:20px 20px
            &.on
              bg-image("star24_on")
            &.half
              bg-image("star24_half")
            &.off
              bg-image("star24_half")
            &:last-child
              margin-right:0


</style>
