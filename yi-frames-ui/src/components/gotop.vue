<template lang="pug">
  a.yi-gotop(href="javascript:;")&attributes(attributes)
</template>
<script>
import {gotop} from '../assets/js/gotop'
export default {

};
</script>
<style lang="scss">
// gotop
@charset "UTF-8";
@import "../assets/scss/public.scss";
.yi-gotop {
  position: fixed;
  right: 30px;
  bottom: 100px;
  z-index: 99;
  display: block;
  width: 100px;
  height: 100px;
  box-shadow: 0 0 2px 0 #d4d4d4 inset;
  background-color: #fff;
  border-radius: 100px;
  transform: translate(150%, 0);
  transition: all 0.6s;
  &:before {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    display: block;
    width: 30px;
    height: 30px;
    border-top: 2px solid #666;
    border-left: 2px solid #666;
    transform: translate(-50%, -25%) rotate(45deg);
  }
  &.block {
    transform: translate(0, 0);
  }
}
</style>
