<template>
  <div>
    <Chart :option="chartOption" style="height: 400px"></Chart>
  </div>
</template>

<script>
import Chart from "@/components/Chart";
import request from "@/utils/request";
export default {
  name: "Analysis",
  components: { Chart },
  mounted() {
    this.getChartData();
    this.interval = setInterval(() => {
      this.getChartData();
      this.chartOption = { ...this.chartOption };
    }, 3000);
  },
  methods: {
    getChartData() {
      request({
        url: "/api/dashboard/chart",
        method: "get",
        params: {
          ID: 12345,
        },
      }).then((response) => {
        this.chartOption = {
          title: {
            text: "ECharts 入门示例",
          },
          tooltip: {},
          xAxis: {
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
          },
          yAxis: {},
          series: [
            {
              name: "销量",
              type: "bar",
              data: response.data,
            },
          ],
        };
      });
    },
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  data() {
    return {
      chartOption: {},
    };
  },
};
</script>

<style scoped></style>
