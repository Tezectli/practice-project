/* 主页 */
<template>
  <div>
    欢迎回来，{{user}} {{role}}!
  </div>
</template>

<script>
import store from "store";
export default {
  name: "SchoolBoard",
  data() {
    return {
      //本地存储获取用户名
      user: store.get("user").username,
      identity: store.get("user").role
    };
  },
  computed:{
    role(){
      if(this.identity == 'student'){
        return '同学'
      }else if(this.identity == 'teacher'){
        return '老师'
      }
      return ''

    }
  }
};
</script>

<style scoped>
div {
  padding: 30px;
  font-size: 20px;
  font-weight: bold;
  background-color: #fff;
  text-align: left;
}
</style>
