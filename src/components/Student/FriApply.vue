/*好友申请组件 */
<template>
    <div>
      <van-notice-bar text="单元格向左滑动可进行操作" left-icon="volume-o" />
      <div class="info">
        <van-swipe-cell v-for="item of data" :key="item.studentId">
          <van-cell :border="false" :title=item.name :value=item.sex />
          <template slot="right">
            <van-button square type="primary" text="详细信息"  @click="showInfoPopup(item.birthday,item.address,item.familyPhone)" id="detailmessage" />
            <van-button square type="primary" text="添加好友" @click="showPopup(item.studentId)" />
          </template>
        </van-swipe-cell>
      </div>
      
      <van-popup v-model="show"  close-icon="close" position="bottom" get-container="#app"   :style="{ height: '25%' }">
          <div style="margin-top:10%">
          <van-field
            center
            clearable
            label="申请内容:"
            placeholder="请输入申请内容"
            v-model="applyContent"
          >
            <van-button slot="button" size="small" type="primary" @click="addFriend">确认申请</van-button>
          </van-field>
          </div>
      </van-popup>

      <van-popup v-model="showInfo"  close-icon="close" position="bottom" get-container="#app"   :style="{ height: '25%' }">
        <van-cell title="生日" :value=birthday icon="medel"/>
        <van-cell title="住址" :value=address icon="location"/>
        <van-cell title="联系电话" :value=familyPhone icon="phone"/>
      </van-popup>
    </div>
</template>

<script>
import {
  NavBar,
  Icon,
  CellGroup,
  SwipeCell,
  Skeleton,
  NoticeBar,
  Button,
  Cell,
  Tag,
  Popup,
} from "vant";
import Vue from "vue";
Vue.use(NavBar)
  .use(Icon)
  .use(CellGroup)
  .use(SwipeCell)
  .use(Cell)
  .use(Skeleton)
  .use(NoticeBar)
  .use(Button)
  .use(Tag)
  .use(Popup);
export default {
    name: "FriApply",
    model: {
    prop: "value",
    event: "update"
  },
  props: {
    value: {
      type:String,
      required:true,
    }
  },
  data(){
    return {
      data:[],
      show:false,
      showInfo:false,
      applyContent:"",
      studentId:"",
      birthday:"",
      address:"",
      familyPhone:"",
      test:{
        name : "x102",
        sex: "男",
        studentId:"1"
      }
    };
  },
  mounted(){
    this.value&&this.getAllStudent(this.value);
  },
  methods:{
    showPopup(value){
      this.show = true;
      this.studentId = value;
    },
    showInfoPopup(birthday,address,familyPhone){
        this.showInfo = true;
        this.birthday = birthday;
        this.address = address;
        this.familyPhone = familyPhone;
    },
    async getAllStudent(value) {
      try {
        const res = await this.$api.user.getAllStudent(value);
        this.data = res.data;

      } catch (e) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
      }
    },
    async addFriend(){
       try {
        await this.$api.user.addFriend(this.studentId,this.applyContent);
        this.show = false;
        this.applyContent = "";
      } catch (e) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
      }
    }
  },
  watch:{
    value(){
      this.data = [];
      this.getAllStudent(this.value);
    }
  }
}
</script>

<style lang="scss" scoped>
.info{
  margin-top: 10px;
}
#detailmessage{
    color: #fff;
    background-color: rgb(168,144,144);
    border: 1px solid rgb(168,144,144);
}
.van-cell.van-cell--borderless {
    height: 60px;
}
button#detailmessage {
    height: 100%;
}
button.van-button.van-button--primary.van-button--normal.van-button--square {
    height: 100%;
}
.van-cell__value {
    margin-top: 9px;
}
.van-cell__title {
    margin-top: 9px;
}
</style>