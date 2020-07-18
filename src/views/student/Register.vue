<template>
  <div class="container" :style="{backgroundColor:bgColor}">
    <van-row type="flex" justify="center">
      <h2 class="title">学生注册</h2>
    </van-row>
    <div class="card">
      <van-row type="flex" justify="center" class="card-row">
        <van-col span="22">
          <van-cell-group title="地区" class="cell-group">
            <location-picker v-model="school" />
          </van-cell-group>
        </van-col>
      </van-row>
      <van-row type="flex" justify="center" class="card-row">
        <van-col span="22">
          <van-radio-group v-model="sex">
            <van-cell-group title="性别" class="cell-group">
              <van-row>
                <van-col span="12">
                  <van-cell class="field" clickable @click="sex = '男'">
                    <svg class="color-icon" aria-hidden="true" slot="title">
                      <use xlink:href="#zhsj-icon-nan" />
                    </svg>
                    <van-radio slot="right-icon" name="男" checked-color="#78909c" />
                  </van-cell>
                </van-col>
                <van-col span="12">
                  <van-cell class="field" clickable @click="sex = '女'">
                    <svg class="color-icon" aria-hidden="true" slot="title">
                      <use xlink:href="#zhsj-icon-nv" />
                    </svg>
                    <van-radio slot="right-icon" name="女" checked-color="#1ab394" />
                  </van-cell>
                </van-col>
              </van-row>
            </van-cell-group>
          </van-radio-group>
        </van-col>
      </van-row>
      <van-row type="flex" justify="center" class="card-row">
        <van-col span="22">
          <van-cell-group title="年龄段" class="cell-group">
            <grade-picker v-model="grade"/>
          </van-cell-group>
        </van-col>
      </van-row>
      <van-row type="flex" justify="center" class="card-row">
        <van-col span="22">
          <van-cell-group title="个人信息" class="cell-group">
            <van-field
              v-model="name"
              clearable
              placeholder="请输入姓名"
              left-icon="user-circle-o"
              error
              class="field"
            />
            <van-field
              v-model.lazy="idcard"
              type="password"
              placeholder="请输入身份证的后六位"
              left-icon="edit"
              :error-message="idcardMsg"
              class="field"
            />
          </van-cell-group>
        </van-col>
      </van-row>
      <van-row type="flex" justify="center" class="card-row">
        <van-col span="22">
          <van-row type="flex" justify="center" align="bottom" class="card-row btn-row">
            <van-button
              block
              round
              :loading="loading"
              loading-text="注册中"
              class="btn-register"
              type="primary"
              @click="register"
            >注册</van-button>
          </van-row>
        </van-col>
      </van-row>
    </div>
  </div>
</template>
<script>
import LocationPicker from "@/components/LocationPicker";
import GradePicker from "@/components/Student/GradePicker";
import {
  Row,
  Col,
  Icon,
  CellGroup,
  Cell,
  Button,
  Field,
  RadioGroup,
  Radio,
} from "vant";
import Vue from "vue";
Vue.use(Row)
  .use(Col)
  .use(Icon)
  .use(CellGroup)
  .use(Cell)
  .use(Button)
  .use(Field)
  .use(Radio)
  .use(RadioGroup);

export default {
  name: "Register",
  components: {
    "location-picker": LocationPicker,
    "grade-picker": GradePicker
  },
  data() {
    return {
      name: "",
      idcard: "",
      sex: "女",
      loading: false,
      school: "",
      grade: 0
    };
  },
  computed: {
    // 按身份切换背景颜色
    bgColor() {
      return this.sex === "男" ? "#78909c" : "#1ab394";
    },
    // 身份证后六位校验
    idcardMsg() {
        // 六位全是数字 or 五位数字最后一位x。
       const reg = /(^\d{6}$)|(^\d{5}(\d|X|x)$)/;  
       return reg.test(this.idcard) ? '' : '身份证后六位格式不符'
    }
  },
  methods: {
    async register() {
      try {
        await this.$api.login.studentRegister(
          this.grade,
          this.name,
          this.sex,
          this.idcard,
          this.school,
        );
        this.$router.push("slogin");
      } catch (error) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
      }
    },
    update(grade){
      this.grade=grade;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/scss/base.scss";

.container {
  width: 375px;
  height: 667px;
  background-color: $primary;
  display: flex;
  align-items: center;
  flex-direction: column;
  .title {
    color: $white;
    text-align: center;
    font-size: 150%;
    margin: 10px 0;
  }
  .card {
    max-width: 80vw;
    background: #f6f6f6;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    box-shadow: 1px 1px 1px #777;
    margin-top: 40px;
    &-title {
      width: 100%;
      height: 100%;
      color: $primary;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 130%;
    }
    &-row {
      margin-top: 5px;
    }
  }
  .area-wrapper {
    background: $white;
  }
  .btn-register {
    background: $primary;
    font-weight: bold;
    font-size: 120%;
    border-radius: 10em;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .van-cell-group /deep/.van-cell-group__title {
    padding-top: 5px;
  }
  .icon {
    width: 30px;
    height: 30px;
  }
}
</style>

