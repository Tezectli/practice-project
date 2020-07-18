/* 用于选班后选人的情况 -润 
To use :user.sync="user"(Object like{name:'x114',id:'123455'}*/
<template>
  <div>
    <van-field
      readonly
      clickable
      right-icon="arrow-down"
      label="队员"
      placeholder="选择队员"
      v-model="input"
      @click="show=true"
    />
    <van-popup v-model="show" position="bottom" get-container="#app" round>
        <van-picker :columns="userArr" ref="stuPicker" @change="setStudent" :loading="loading" />
    </van-popup>
  </div>
</template>
<script>
import Vue from "vue";
import storage from "../../common/storage";
import { Picker, Popup, Field } from "vant";
Vue.use(Picker)
  .use(Popup)
  .use(Field);
export default {
  name: "ClassStudentSelector",
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      userArr: [],
      classes: [],
      students: [],
      activeIndex: 0,
      show: false,
      classText: "",
      studentName: "",
      loading: false, //picker的loading
    };
  },
  computed: {
    input() {
      return `${this.studentName}`;
    }
  },
  methods: {
    toggle() {
      this.loading = !this.loading;
    },
    async getStudent(classId) {
      this.toggle();
      try {
        //  从缓存中获取班级的学生名单
        let cacheStudent = storage.get(`class-${classId}`);
        let { data } = cacheStudent
          ? cacheStudent
          : await this.$api.user.getAllStudent(classId);
          // 记录数据以便找出id
        this.students = data;
        data = data.map(student => student.name);
        if (!this.studentName) {
          this.userArr.push({ values: data });
          this.studentName = data[0];
        } else {
          this.$refs.stuPicker.setColumnValues(1, data);
        }
        this.toggle();
      } catch (error) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
      }
    },
    //   获取树形选择器左侧数据
    async getClass() {
      this.toggle();
      try {
        //   从缓存中获取班级
        let cacheClass = storage.get("studentClasses");
        let { data } = cacheClass
          ? cacheClass
          : await this.$api.common.getStudentClass();
          // 记录数据以便找出id
        this.classes = data;
        data = data.map(_class => _class.className)
        //   填入左侧导航中
        if (!this.classText) {
          this.userArr.push({ values: data });
        }
        this.classText = data[0];
        this.getStudent(this.classes[0].classId);
      } catch (e) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
      }
      this.toggle();
    },
    // 加载右侧数据,index:左侧的索引
    setStudent(picker, vals) {
      this.classText = vals[0];
      this.studentName = vals[1];
      this.activeIndex = picker.getColumnIndex(1);
      // 获取一下对应班级的数据
      this.getStudent(this.classes[picker.getColumnIndex(0)].classId);
    },
  },
  created() {
    this.getClass();
  },
  watch:{
      studentName(){
        //   告知父组件
          this.$emit('update:user',this.students[this.activeIndex])
      }
  }
};
</script>