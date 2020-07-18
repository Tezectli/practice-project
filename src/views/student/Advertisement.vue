// 2020/4/1 邦 广告推广页
<template>
  <div>
    <component :is="curCompoent" v-model="changeComponents"></component>
  </div>
</template>

<script>
import AdvetisementTag from "../../components/Student/AdvertisementTag";
import AdvetisementDetail from "../../components/Student/AdvertisementDetail";
import TagManage from "../../components/Student/TagManage";
export default {
  name: "Advetisement",
  data() {
    return {
      changeComponents: 0,
      curCompoent: "advertisement-tag"
    };
  },
  components: {
    "advertisement-tag": AdvetisementTag,
    "advertisement-detail": AdvetisementDetail,
    "tag-manage": TagManage
  },
  mounted() {
    switch (this.changeComponents) {
      case 1:
        this.curCompoent = "advertisement-detail";
        break;
      case 2:
        this.curCompoent = "tag-manage";
        break;
      default:
        this.curCompoent = "advertisement-tag";
    }
  },
  methods: {},
  watch: {
    changeComponents() {
      switch (this.changeComponents) {
        case 1:
          this.curCompoent = "advertisement-detail";
          break;
        case 2:
          this.curCompoent = "tag-manage";
          break;
        default:
          this.curCompoent = "advertisement-tag";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>