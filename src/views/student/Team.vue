<template>
  <div>
    <van-nav-bar title="我的小队" left-arrow @click-left="$router.back(-1);"></van-nav-bar>
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
            text="添加成员"
            @click="AddStudent(team.teamId,team.processId)"
            v-if="iscaptain(index)"
          />
          <van-button
            type="danger"
            size="small"
            text="解散小队"
            @click="DeleteTeam(`${team.teamId}`,`${team.processId}`)"
            class="btn-right"
            v-if="iscaptain(index)"
          />
          <van-button
            type="danger"
            size="small"
            text="退出小队"
            @click="LeaveTeam(`${team.teamId}`,`${popupPeople.userId}`,`${team.processId}`)"
            class="btn-right"
            v-else
          />
        </div>
        <!-- 显示队员详细信息popup -->
        <van-popup
          v-model="show"
          closeable
          close-icon="close"
          position="bottom"
          get-container="#app"
          :style="{ height: '50%' }"
        >
          <van-cell title="姓名" :value="popupPeople.userName" />
          <van-cell title="性别" :value="popupPeople.userSex" />
          <van-cell title="民族" :value="popupPeople.userRace" />
          <van-cell title="年级" :value="popupPeople.gradeId" />
          <van-cell title="身份证后6位" :value="popupPeople.userIdCard" />
          <van-cell title="联系电话" :value="popupPeople.tel"></van-cell>
          <van-cell title="微信" :value="popupPeople.wx" />
          <van-row type="flex" justify="center">
            <van-col span="6">
              <van-button
                type="danger"
                size="small"
                text="踢出小队"
                class="btn-delete"
                v-if="iscaptain(index)"
                @click="Deleteteammate(`${team.teamId}`,`${popupPeople.userId}`,`${team.processId}`)"
              />
            </van-col>
          </van-row>
        </van-popup>
        <!-- 添加队员popup -->
        <van-popup
          v-model="addshow"
          closeable
          close-icon="close"
          position="bottom"
          get-container="#app"
          :style="{ height: '60%' }"
        >
          <van-row>
            <van-col offset="20" span="4">
              <van-button type="primary" size="small" text="确认" @click="Student" />
            </van-col>
          </van-row>
          <tree-selector :user.sync="user"></tree-selector>
          <van-radio-group v-model="radio">
            <van-cell-group>
              <van-row>
                <van-col span="8">
                  <van-cell title="是否为教练"></van-cell>
                </van-col>
                <van-col span="8">
                  <van-cell title="是" clickable @click="radio = '1'">
                    <van-radio slot="right-icon" name="1" checked-color="#1ab394" />
                  </van-cell>
                </van-col>
                <van-col span="8">
                  <van-cell title="否" clickable @click="radio = '0'">
                    <van-radio slot="right-icon" name="0" checked-color="#1ab394" />
                  </van-cell>
                </van-col>
              </van-row>
            </van-cell-group>
          </van-radio-group>
          <van-field required v-model="userIdCard" label="身份证后6位" placeholder="请输入身份证后6位" />
          <van-field required v-model="userRace" label="民族" placeholder="请输入民族" />
          <van-field required v-model="tel" label="联系电话" placeholder="请输入联系电话" />
          <van-field required v-model="wx" label="微信" placeholder="请输入微信" />
        </van-popup>
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
  Card,
  Tag,
  Dialog,
  Popup,
  Cell,
  field,
  Radio,
  CellGroup,
  Col,
  Row,
  RadioGroup,
  NavBar
} from "vant";
import Vue from "vue";
import ClassStudentSelector from "@/components/Student/ClassStudentSelector";
Vue.use(Button)
  .use(Icon)
  .use(Collapse)
  .use(CollapseItem)
  .use(Card)
  .use(Tag)
  .use(Dialog)
  .use(Popup)
  .use(Cell)
  .use(CellGroup)
  .use(field)
  .use(Radio)
  .use(Col)
  .use(Row)
  .use(RadioGroup)
  .use(NavBar);
import store from "store";
export default {
  name: "TeamList",
  props: {
    processId: {
      type: String,
      required: false
    }
  },
  components: {
    "tree-selector": ClassStudentSelector
  },
  data() {
    return {
      activeName: "1",
      userId: store.get("user").id,
      teamPost: [],
      show: false,
      newTeamMember: "",
      popupPeople: {},
      addshow: false,
      radio: "0",
      teamId: "",
      tel: "",
      wx: "",
      processid: "",
      userRace: "",
      userIdCard: ""
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
    //解散小队接口
    async deleteTeam(teamId,processId) {
      try {
        await this.$api.activity.deleteTeam(teamId,processId);
      } catch (e) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
        this.loading = false;
      }
    },
    //解散小队操作
    DeleteTeam(teamId,processId) {
      this.$dialog
        .confirm({
          message: "是否确认解散小队"
        })
        .then(() => {
          // on confirm
          this.deleteTeam(teamId,processId);
        })
        .catch(() => {
          // on cancel
        });
    },
    //退出小队
    async leaveTeam(teamId, userId,processId) {
      try {
        await this.$api.activity.leaveTeam(teamId, userId,processId);
      } catch (e) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
        this.loading = false;
      }
    },
    LeaveTeam(teamId, userId,processId) {
      this.$dialog
        .confirm({
          message: "是否确认退出小队"
        })
        .then(() => {
          // on confirm
          this.leaveTeam(teamId, userId,processId);
        })
        .catch(() => {
          // on cancel
        });
    },
    //踢出队员
    async deleteteammate(teamId, userId,processId) {
      try {
        await this.$api.activity.deleteteammate(teamId, userId,processId);
      } catch (e) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
        this.loading = false;
      }
    },
    Deleteteammate(teamId, userId,processId) {
      this.$dialog
        .confirm({
          message: "是否确认踢除队员"
        })
        .then(() => {
          // on confirm
          this.deleteteammate(teamId, userId,processId);
        })
        .catch(() => {
          // on cancel
        });
    },
    //添加队员
    async Student() {
      try {
        // 队员信息
        let activityUser = {
          gradeId: this.user.gradeId,
          isCoach: this.radio,
          processId: this.processid,
          tel: this.tel,
          userIdCard: this.userIdCard,
          userName: this.user.name,
          userRace: this.userRace,
          userSex: this.user.sex,
          wx: this.wx
        };
        await this.$api.activity.teammate(this.teamId, activityUser);
      } catch (e) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
      }
    },
    AddStudent(teamId, processId) {
      this.teamId = teamId;
      this.processid = processId;
      this.addshow = true;
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