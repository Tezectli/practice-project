<template>
  <div>
    <van-nav-bar title="选择小队报名" left-arrow @click-left="$router.back(-1);" right-text="创建小队" @click-right="onClickRight"></van-nav-bar>
    <van-collapse accordion v-for="(team,index) of teamPost" :key="team.teamId" v-model="teamId">
      <van-collapse-item
        :name="index"
        :value="team.contactName"
        :label="team.teamType"
        size="large"
      >
        <template slot="title">{{team.teamName}}</template>
        <van-cell
          v-for="people of team.activityUsers"
          :value="people.userSex"
          :key="people.userId"
          @click="showPeople(people)"
        >
          <template slot="label">
            <van-icon name="phone" />联系电话:
            <a :href="'tel:' + people.tel">{{people.tel}}</a>
          </template>
          <template slot="title">
            <van-tag plain type="primary">{{identity(people.isCoach)}}</van-tag>
            {{people.userName}}
          </template>
        </van-cell>
        <div class="under">
          <van-button
            type="primary"
            size="small"
            text="小队报名"
            @click="choiceTeam(`${team.teamId}`,`${team.processId}`,`${userId}`)"
            class="btn-right"
          />
        </div>
      </van-collapse-item>
    </van-collapse>
  </div>
</template>
<script>
import {
  Button,
  Icon,
  Collapse,
  CollapseItem,
  Tag,
  Cell,
  field,
  CellGroup,
  Col,
  Row,
  NavBar
} from "vant";
import Vue from "vue";
Vue.use(Button)
  .use(Icon)
  .use(Collapse)
  .use(CollapseItem)
  .use(Tag)
  .use(Cell)
  .use(CellGroup)
  .use(field)
  .use(Col)
  .use(Row)
  .use(NavBar);
import store from "store";
export default {
  name: "TeamList",
  data() {
    return {
      activeName: "1",
      userId: store.get("user").id,
      teamPost: [],
      show: false,
      newTeamMember: "",
      popupPeople: {},
      addshow: false,
      teamId: "",
      processId: this.$route.query.processid,
    };
  },
  methods: {
    // 小队信息接口
    async getTeam() {
      try {
        // 获取小队信息
        let res = await this.$api.activity.getTeam(this.userId);
        this.teamPost = res.data;
      } catch (e) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
      }
    },
    async choiceTeam(teamId, teamprocessId, userId) {
      try {
        // 获取小队信息
        let res = await this.$api.activity.choiceTeam(
          teamId,
          this.processId,
          userId,
          teamprocessId
        );
        this.teamPost = res.data;
      } catch (e) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
      }
    },
    identity(isCoach) {
      if (isCoach) {
        return "教练";
      } else {
        return "队员";
      }
    },
    showPeople(people) {
      this.popupPeople = people;
      this.show = true;
    },
    iscaptain(index) {
      if (this.teamPost[index].contactId == this.userId) {
        return true;
      }
      return false;
    },
    onClickRight() {
      this.$router.push(`/s/addTeam?processid=${this.processId}`)
    }
  },
  created() {
    this.getTeam();
  }
};
</script>
<style lang="scss"  scoped>
@import "@/scss/base.scss";
.btn-right {
  float: right;
}
.under {
  width: 100%;
  height: 20px;
}
.btn-delete {
  margin-top: 5px;
}
</style>