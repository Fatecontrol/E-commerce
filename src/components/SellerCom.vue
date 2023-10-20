<template>
    <div class="com-container">
        <div class="com-chart" ref="seller_ref">seller组件</div>
    </div>
</template>
    
<script setup lang='ts'>
import { getCurrentInstance, onMounted,ref } from 'vue'
const { proxy } = getCurrentInstance() as any
// 获取dom
const seller_ref = ref()
// echarts实例化
const chartInstance = ref()
const $echarts = proxy.$echarts
const $http = proxy.$http
// echarts初始化
const initChart = ()=>{
    chartInstance.value = $echarts.init(seller_ref.value)
    chartInstance.value.setOption({
    title: {
      text: 'ECharts 入门示例'
    },
    tooltip: {},
    xAxis: {
      data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }
    ]
  });
}
// 获取数据
const getData =async () =>{
    await $http.get('seller')
}
onMounted(() => {
console.log(seller_ref);
initChart()
getData()
})
</script>
    
<style lang='scss' scoped></style>