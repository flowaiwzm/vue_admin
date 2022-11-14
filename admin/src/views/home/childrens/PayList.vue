<template>
    <div class="content">
         <div class="inputDom">
            <el-input v-model="input" placeholder="请输入收入款" >
            </el-input>
            <el-button type="success" @click="Makeqrcode">生成二维码</el-button>
         <div class="qrcode" ref="qrcodeDom"></div>
         </div>
    </div>
</template>

<script setup>
import {ref,nextTick} from 'vue'
import QRcode from 'qrcodejs2'
const input=ref('')
let qrcodeDom=ref(null)
let Makeqrcode=()=>{
    console.log("ssss");
    qrcodeDom.value.innerHTML=""
    nextTick(()=>{
        new QRcode(qrcodeDom.value,{
            text:input.value,
            colorDark:"#000",
            colorLight:"#FFF"
        })
    })
}
</script>

<style lang="scss" >
.el-input{
    margin-bottom: 10px;
}
.el-button{
    margin-bottom: 10px;
}
.content{
    text-align: center;
}
.qrcode{
width:300px;
height:300px;
margin: 0 auto;
}
.inputDom{
width:400px;
margin:0 auto;
}
</style>