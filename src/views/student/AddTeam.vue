<template>
  <div>
    <van-nav-bar
      title="活动报名"
      left-text="返回"
      right-text="确定"
      left-arrow
      @click-left="$router.go(-1)"
      @click-right="postTeam()"
    />
    <van-cell-group>
      <van-field required v-model="teamName" label="小队名称" placeholder="请输入小队名称" />
      <van-field required v-model="teamType" label="年级" placeholder="请输入年级" />
      <van-field v-model="parentMen" label="男家长人数" placeholder="请输入男家长人数" />
      <van-field v-model="parentWomen" label="女家长人数" placeholder="请输入女家长人数" />
    </van-cell-group>
    <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">队长信息</van-divider>
    <div>
      <van-field :value="this.userName" label="队长" left-icon="contact" disabled />
      <!-- <tree-selector :user.sync="user"></tree-selector> -->
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
      <van-field required v-model="tel" label="联系电话" placeholder="请输入联系电话" />
      <van-field v-model="userRace" label="民族" placeholder="请输入民族" />
      <van-field v-model="wx" label="微信" placeholder="请输入微信" />
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import {
  NavBar,
  Field,
  Cell,
  CellGroup,
  Divider,
  TreeSelect,
  Row,
  Col,
  Radio,
  RadioGroup
} from "vant";
import storage from "../../common/storage";
//import ClassStudentSelector from "@/components/Student/ClassStudentSelector";
import store from "store";
Vue.use(NavBar)
  .use(Field)
  .use(Cell)
  .use(CellGroup)
  .use(Divider)
  .use(TreeSelect)
  .use(Row)
  .use(Col)
  .use(Radio)
  .use(RadioGroup);
export default {
  components: {
    // "tree-selector": ClassStudentSelector
  },
  data() {
    return {
      show: false,
      items: [],
      data: [],
      count: 0,
      user: {},
      radio: "0",
      userName: store.get("user").username,
      userId: store.get("user").id,
      processId: this.$route.query.processid,
      teamName: "",
      teamType: "",
      parentMen: "",
      parentWomen: "",
      tel: "",
      wx: "",
      userRace:"",
      userIdCard:""
    };
  },
  methods: {
    showPopup() {
      // 显示
      this.show = true;
    },
    async getClass() {
      try {
        let cacheVal = storage.get("studentClasses");
        const res = cacheVal
          ? cacheVal.value
          : await this.$api.common.getStudentClass();
        this.count = res.count;
        this.data = res.data.map(item => {
          return {
            key: item.classId,
            text: item.className
          };
        });
        // 默认选第一个班
        this.$emit("update", this.data[0].key);
        this.$emit("change");
        this.val = this.data[0].text;
      } catch (e) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
      }
    },
    //获取学生信息
    async getStudentDetail() {
      try {
        // 创建小队信息
        this.user = await this.$api.user.getStudentDetail();
      } catch (e) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
      }
    },
    //创建小队
    async postTeam() {
      try {
        // 创建小队信息
        let activityUser = {
          gradeId: this.user.gradeId,
          isCoach: this.radio,
          isCaptain: "1",
          tel: this.tel,
          userIdCard: this.userIdCard,
          userName: this.user.name,
          userRace: this.userRace,
          userSex: this.user.sex,
          wx: this.wx
        };

        await this.$api.activity.postTeam(
          this.userId,
          this.processId,
          this.teamName,
          this.teamType,
          this.parentMen,
          this.parentWomen,
          activityUser
        );
      } catch (e) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
      }
    }
  },
  created() {
    this.getStudentDetail();
  }
};
</script>
<style lang="scss"  scoped>
@import "@/scss/base.scss";
.radio {
  width: 100px;
  margin: 0px;
}
</style>