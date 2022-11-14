<template>
  <div>
      <h2>每日访客统计</h2>
      <div id="charttwo" class="two"></div>
  </div>
</template>

<script setup>
import {inject,onMounted,reactive} from "vue"
import link from "../api/link.js"
import url from "../api/url.js"


let $echarts=inject("echarts")
onMounted(()=>{

    let myChart=$echarts.init(document.getElementById("charttwo"))

    link(url.chartDataTwo).then((ok)=>{
        console.log(ok)

        myChart.setOption({
            xAxis:{
                 type:"category",
                 data:ok.data.day,
                boundaryGap:false,
                // 设置不留白
            axisLine:{
                lineStyle:{
                    color:"#fff"
                }
            }
            },

            tooltip:{},
            yAxis:{
                type:"value",
            axisLine:{
                lineStyle:{
                    color:"#fff"
                }
            }
            },
            // grid的属性设置图的位置
            grid:{
                left:"1%",
                right:"4%",
                bottom:"3%",
                containLabel:true//包含图表题

            },
            series:[
                {
                    type:"line",
                    name:"外卖",
                    data:ok.data.num.外卖,
                    stack:"Total",//设置数据的堆叠
                    smooth:true,//设置为曲线
                    // 设置堆叠的样式以下
                    areaStyle:{
                        opacity:0.8,
                          color:new $echarts.graphic.LinearGradient(0,0,0,1,[
                            {
                                offset:0,
                                color:"rgb(128,255,165)"
                            },
                            {
                                offset:1,
                                color:"rgb(1,191,236)"
                            }
                        ])
                    },
                    lineStyle:{
                        width:0//线段的设置
                    }
                },
                {
                    type:"line",
                    name:"快递",
                    data:ok.data.num.快递,
                    stack:"Total",
                    smooth:true,
                    areaStyle:{
                        opacity:0.8,
                          color:new $echarts.graphic.LinearGradient(0,0,0,1,[
                            {
                                offset:0,
                                color:"rgb(0,221,255)"
                            },
                            {
                                offset:1,
                                color:"rgb(77,119,255)"
                            }
                        ])
                    },
                    lineStyle:{
                        width:0
                    }
                },
                {
                    type:"line",
                    name:"一般访客",
                    data:ok.data.num.一般访客,
                     stack:"Total",
                    smooth:true,
                    areaStyle:{
                        opacity:0.8,
                          color:new $echarts.graphic.LinearGradient(0,0,0,1,[
                            {
                                offset:0,
                                color:"rgb(55,162,255)"
                            },
                            {
                                offset:1,
                                color:"rgb(116,21,219)"
                            }
                        ])
                    },
                    lineStyle:{
                        width:0
                    }
                },
                {
                    type:"line",
                    name:"授权访客",
                    data:ok.data.num.授权访客,
                     stack:"Total",
                    smooth:true,
                    areaStyle:{
                        opacity:0.8,
                          color:new $echarts.graphic.LinearGradient(0,0,0,1,[
                            {
                                offset:0,
                                color:"rgb(255,0,134)"
                            },
                            {
                                offset:1,
                                color:"rgb(135,0,157)"
                            }
                        ])
                    },
                    lineStyle:{
                        width:0
                    }
                },
            ]
        })
    })

   
})


</script>

<style lang="scss" scoped>
    h2{
        height: 0.6rem;
        color: #fff;
        line-height: 0.6rem;
        text-align: center;
        font-size:0.25rem;
    }
    .two{
        height: 4.5rem;
        
    }
</style>