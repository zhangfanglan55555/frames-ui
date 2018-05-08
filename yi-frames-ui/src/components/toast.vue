<template lang="pug">
.toast
    test(:show-toast='showToast')
    button(@click='btn') 点我隐藏
</template>
<script>
import test from './test'
console.log(test)
export default {
  data() {
    return {
        showToast:  true
    };
  },
  components: {
    test
  },
  methods:{
      btn(){
          this.showToast = false
      }
  }
};
</script>

