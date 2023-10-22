<template>
  <div class="com-container">
    <div class="com-chart" ref="seller_ref">seller组件</div>
  </div>
</template>
<script setup lang='ts'>
import { getCurrentInstance, onMounted, ref, onUnmounted } from 'vue'
const { proxy } = getCurrentInstance() as any
// 获取dom
const seller_ref = ref()
// echarts实例化
const chartInstance = ref()
const $echarts = proxy.$echarts
// const $http = proxy.$http
// 当前显页数
const currentPage = ref<number>(1)
// 一共有多少页
const totalPage = ref<number>(0)
// 定时器
const timerId = ref<number>()
// 图表数据
const echartsValue = [
  { name: '商家1', value: 99 },
  { name: '商家2', value: 102 },
  { name: '商家3', value: 83 },
  { name: '商家4', value: 49 },
  { name: '商家5', value: 200 },
  { name: '商家6', value: 152 },
  { name: '商家7', value: 76 },
  { name: '商家8', value: 23 },
  { name: '商家9', value: 87 },
  { name: '商家10', value: 223 },
  { name: '商家11', value: 145 },
  { name: '商家12', value: 187 },
  { name: '商家13', value: 127 },
  { name: '商家14', value: 57 },
  { name: '商家15', value: 99 },
]
type List = {
  name: string,
  value: number
}
const list = ref<List[]>([])
// 数据格式化
const getData = () => {
  list.value = echartsValue.sort((a, b) => {
    return a.value - b.value // 从小到大排序
  })
  // 获取总页数
  totalPage.value = list.value.length % 5 === 0 ? list.value.length / 5 : list.value.length / 5 + 1

  // 更新图表
  updateChart()
  // 启动定时器
  startInterval()
}
// 初始化图表
const initChart = () => {
  /* if (chartInstance.value != null && chartInstance.value != "" && chartInstance.value != undefined) {
    chartInstance.value.dispose();//销毁
  } */
  chartInstance.value = $echarts.init(seller_ref.value, 'dark')
 /*  const initOption = {
    title: {
      text: '▌ 商家销售统计',
      textStyle: {
        fontSize: 66
      },
      left: 20,
      top: 20
    },
    grid: {
      top: '20%',
      left: '3%',
      right: '6%',
      bottom: '3%',
      containLabel: true // 距离包含坐标轴文字
    },
    xAxis: {
      tpye: 'value'
    },
    yAxis: {
      tpye: 'category'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        z: 0,
        lineStyle: {
          width: 1,
          color: '2D3443'
        }
      }
    },
    series: [
      {
        type: 'bar',
        barWidth: 66,
        label: {
          show: true,
          position: 'right'
        },
        itemStyle: {
          borderRadius: [0, 33, 33, 0],
          // 指名颜色渐变方向
          // 指名不同百分比之下的颜色的值
          color: new $echarts.graphic.LinearGradient(0, 0, 1, 0, [
            // 百分之0状态之下的颜色
            {
              offset: 0,
              color: "#5052EE"
            },
            // 百分之100状态之下的颜色
            {
              offset: 1,
              color: "#BA6EE5"
            }
          ])
        }
      }
    ]
  }
  chartInstance.value.setOption(initOption) */
  // 监听 鼠标移入移出
  // 移入关闭定时器
  chartInstance.value.on('mouseover', () => {
    clearInterval(timerId.value)
  })
  // 移除打开定时器
  chartInstance.value.on('mouseout', () => {
    startInterval()
  })
}
// 更新图表
const updateChart = () => {
  const start = (currentPage.value - 1) * 5
  const end = currentPage.value * 5
  const showData = list.value.slice(start, end)
  const sellerNames = showData.map((item) => {
    return item.name
  })
  const sellerValues = showData.map((item) => {
    return item.value
  })
  const option = {
    title: {
      text: '▌ 商家销售统计',
      textStyle: {
        fontSize: 66
      },
      left: 20,
      top: 20
    },
    grid: {
      top: '20%',
      left: '3%',
      right: '6%',
      bottom: '3%',
      containLabel: true // 距离包含坐标轴文字
    },
    xAxis: {
      tpye: 'value'
    },
    yAxis: {
      tpye: 'category',
      data: sellerNames
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        z: 0,
        lineStyle: {
          width: 1,
          color: '2D3443'
        }
      }
    },
    series: [
      {
        type: 'bar',
        data: sellerValues,
        barWidth: 66,
        label: {
          show: true,
          position: 'right'
        },
        itemStyle: {
          borderRadius: [0, 33, 33, 0],
          // 指名颜色渐变方向
          // 指名不同百分比之下的颜色的值
          color: new $echarts.graphic.LinearGradient(0, 0, 1, 0, [
            // 百分之0状态之下的颜色
            {
              offset: 0,
              color: "#5052EE"
            },
            // 百分之100状态之下的颜色
            {
              offset: 1,
              color: "#BA6EE5"
            }
          ])
        }
      }
    ]
  }
  chartInstance.value.setOption(option);
}
// 渲染图表
onMounted(() => {
  // 初始化图表
  initChart()
  getData()

})
// 实时更新
const startInterval = () => {
  if (timerId.value) {
    clearInterval(timerId.value)
  }
  timerId.value = setInterval(() => {
    currentPage.value++
    // 判断页码
    if (currentPage.value > totalPage.value) {
      currentPage.value = 1
    }
    updateChart()
  }, 3000)
}
// 组件销毁时 清除定时器
onUnmounted(() => {
  clearInterval(timerId.value)
})

</script>
    
<style lang='scss' scoped></style>