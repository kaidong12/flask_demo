<script setup lang="ts">
import { ElRow, ElCol, ElCard, ElSkeleton, ElSelect, ElOption, ElStatistic } from 'element-plus'
import { Echart } from '@/components/Echart'
import { rebootOpt } from './echarts-data'
import { ref, Ref, reactive, onMounted, onUnmounted } from 'vue'
import { getSysInfoWsConn } from '@/api/dashboard/dashboard'
import { EChartsOption } from 'echarts'
import { SySInfo } from '@/api/dashboard/dashboard/types'
// import { getAllEthLinksApi } from '@/api/system/sysConfig'

let sysInfoStream: WebSocket

const loading = ref(true)

const selectedLink: Ref<string> = ref('')
const allLinks: Ref<string[]> = ref([])
const cpuTemperature: Ref<number> = ref(0)
const memTotal: Ref<number> = ref(0)
const diskTotal: Ref<number> = ref(0)

const rebootLogChart = ref()

const conmodRebootLogOptionsData = reactive<EChartsOption>(rebootOpt) as EChartsOption

const initSysInfoStream = () => {
  sysInfoStream = getSysInfoWsConn()
  let cpuIdle: number[] = []
  let dateArr: string[] = []
  sysInfoStream.onopen = () => {
    console.log('SysInfo Stream Connected')
    loading.value = false
  }
  sysInfoStream.onmessage = (event) => {
    if (event.type != 'message') {
      return
    }
    let sysInfo: SySInfo = JSON.parse(event.data)
    selectedLink.value = sysInfo.EthLinkName
    cpuTemperature.value = sysInfo.CPUTemperature
    memTotal.value = sysInfo.MemTotal
    diskTotal.value = sysInfo.DiskTotal
    let date = new Date()
    date.setHours(date.getHours() + 8)
    let dateStr = date.toISOString().replace('T', ' ').substring(0, 19)
    addData(dateArr, dateStr, 60)
    addData(cpuIdle, sysInfo.CPUIdleRate, 60)

    rebootLogChart.value.setData({
      xAxis: {
        data: dateArr
      },
      series: [
        {
          name: 'Idle',
          data: cpuIdle
        }
      ]
    })
  }
  sysInfoStream.onerror = (error) => {
    console.log('SysInfo Stream Error: ', error)
  }

  sysInfoStream.onclose = (_: CloseEvent) => {
    console.log('SysInfo Stream Disconnected')
  }
}

function addData(arr: any[], data: any, maxLen: number) {
  arr.push(data)
  if (arr.length > maxLen) {
    arr.shift()
  }
}

onMounted(() => {
  // initSysInfoStream()
  // getAllEthLinksApi().then((res) => {
  //   if (res.code == 200) {
  //     allLinks.value = res.data
  //   }
  // })
})

onUnmounted(() => {
  if (rebootLogChart.value) {
    rebootLogChart.value.destoryChart()
  }
})
</script>

<template>
  <ElRow :gutter="20" justify="space-between">
    <ElCol :span="24">
      <ElCard shadow="hover" class="mb-20px">
        <ElSkeleton :loading="loading" animated :rows="4">
          <Echart ref="rebootLogChart" :options="conmodRebootLogOptionsData" :height="300" />
        </ElSkeleton>
      </ElCard>
    </ElCol>
  </ElRow>
</template>
