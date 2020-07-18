<template>
  <div>
    <span>跳转中...</span>
  </div>
</template>
<script>
import { isOnWechat } from "@/common/other";
export default {
  created() {
    if (isOnWechat()) {
      if (this.$route.query.role == "student") {
        this.$router.push("/sLogin");
      }else{
        this.$router.push("/tLogin");
      }
    }else{
        this.$router.push("/login");
    }
  }
};
</script>