<template lang="pug">
    include ../../node_modules/yi-frames-wx/m-widget/src/pug/toast.pug
    .test
      +toast({
        'iconClass': 'iconClass',
        'iconBlock': 'icon对齐方式',
        'text': '文本内容',
    })(v-show='showToast')
</template>
<script>
export default {
  props: {
      showToast:Boolean
  },
  data() {
    return {
      a: true
    };
  }
};
</script>

<style  lang='scss'>
@import "../assets/scss/public.scss";
.yi-toast{
    display: block
}
</style>