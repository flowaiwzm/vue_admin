<template>
  <div class="login">
       <div class="login-con">
        <ul class="menu-tab">
          <li 
          v-for="v in menuDate" 
          :class="{current:v.current}"
          :key="v.type"
          @click="clickMenu(v)">
          {{v.txt}}
          </li>
        </ul>
        <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        class="demo-ruleForm"
      >
        <el-form-item prop="username">
          <label>邮箱</label>
          <el-input
            v-model="ruleForm.username"
            type="text"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item prop="password">
          <label>密码</label>
          <el-input
            v-model="ruleForm.password"
            type="password"
            autocomplete="off"
            minlength="6"
            maxlength="15"
          />
        </el-form-item>
        <el-form-item prop="passwords" v-show="model === 'register'">
          <label>重复密码</label>
          <el-input
            v-model="ruleForm.passwords"
            minlength="6"
            maxlength="15"
            type="password"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            :disabled="btnbool"
            type="primary"
            class="login-btn block"
            @click="submitForm(ruleFormRef)"
            >{{ model === "login" ? "登录" : "注册" }}</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang='ts' setup>
// 创建复杂数据类型
import {reactive,ref,onMounted,watch} from "vue"
import type { FormInstance } from "element-plus";
import * as ck from "../../util/verfifcation.js";// 引用工具库
import link from "../../api/link.js"
import apiUrl from "../../api/url.js"
import { ElMessage } from 'element-plus'
import router from "@/router";
import usemd5 from "../../hook/index.js"
// import {useRouter} from 'vue-router'
// let router=useRouter()
const menuDate=reactive([
{
  txt:"登录",current:true,type:"login"
},
{
  txt:"注册",current:false,type:'register'
}
]);
// let current=ref("true")
let model=ref("login")
let clickMenu=(item:any)=>{
  // console.log("bs");
   menuDate.forEach((elemt)=>{
    elemt.current=false;
   })
   item.current=true;
  //  点击改变
   model.value=item.type;
}
const ruleFormRef = ref<FormInstance>();

const checkUser = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error("邮箱不能为空！！"));
  } else if (ck.CkEmail(value)) {
    return callback(new Error("邮箱格式不正确！！"));
  } else {
    callback();
  }
};

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("密码不能为空"));
  } else if (ck.CkPass(value)) {
    callback(new Error("密码格式有误必须在6至15位字母+数字！！"));
  } else {
    callback();
  }
};
const validatePass2 = (rule: any, value: any, callback: any) => {
  // 因为登录的时候没有重复密码的校验  所以在登录的时候取消重复密码的校验
  if (model.value === "login") {
    callback();
  }

  if (value === "") {
    callback(new Error("重复密码不能为空！"));
  } else if (value !== ruleForm.password) {
    callback(new Error("两次密码必须相同！"));
  } else {
    callback();
  }
};
const ruleForm = reactive({
  username: "",
  password: "",
  passwords: "",
  pass: "",
  checkPass: "",
  age: "",
});

let btnbool=ref(true)
// watch的监听登录注册按钮的状态
watch(ruleForm,(newval,oldval)=>{
  if(model.value==="login"){
    if(newval.username!=""&&newval.password!=""){
      btnbool.value=false
    }else{
        btnbool.value=true
    }

  }else{
     if(newval.username!=""&&newval.password!=""&&newval.passwords!=""){
      btnbool.value=false
    }else{
        btnbool.value=true
    }
  }
})

// 这里就是设置 以哪种方式触发表单验证 失去焦点验证
const rules = reactive({
  password: [{ validator: validatePass, trigger: "blur" }],
  passwords: [{ validator: validatePass2, trigger: "blur" }],
  username: [{ validator: checkUser, trigger: "blur" }],
});
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      // 登录
      if(model.value==="login"){
        // console.log("sb");
      // let data={
      //       name:ruleForm.username,
      //       pwd:usemd5(ruleForm.password)
      //   }
        link(apiUrl.register,'GET',{name:ruleForm.username,pwd:usemd5(ruleForm.password)}).then((ok:any)=>{
          // console.log(ok);
          if(ok.data.length!=0){
             console.log("登录成功");
             router.push("/home");
                // console.log(ok);
          }
          else{
            console.log("登录失败");
          }
        })
      }
      // 注册
      else{
        console.log('注册!')
        let data={
            name:ruleForm.username,
            pwd:usemd5(ruleForm.password)
        }
        link(apiUrl.register,"POST",data).then((ok:any)=>{
           console.log(ok);
           if(Object.keys(ok.data).length!==0){
            ElMessage({
                showClose: true,
                message: '注册成功',
              })
              model.value="login";
              // current.value=false;
              menuDate.forEach(v=>{
                v.current=false;
              })
              menuDate[0].current=true;
           }
           else{
            ElMessage({
              showClose: true,
              message: '注册失败',
              type: 'error',
            })
           }
      })
      }
    } else {
      console.log('error submit!')
      return false
    }
  })
}

</script>

<style lang="scss" >
.login {
  background-color: #9be68c;
  height: 100%;
}
html,
body,
#app {
  height: 100%;
}
.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
  }
  .current {
    background-color: rgba(82, 47, 236, 0.5);
  }
}

.demo-ruleForm {
  width: 30%;
  margin: 50px auto;
  label {
    display: block;
    margin-bottom: 3px;
    font-size: 14px;
    color: #fff;
  }
  .block {
    display: block;
    width: 100%;
  }
  .login-btn {
    margin-top: 20px;
  }
}
</style>
