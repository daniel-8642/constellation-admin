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
    }, 30000);
  },
  methods: {
    getChartData() {
      let timestamp = new Date().getTime();
      let rand = Math.ceil(100000000000 * Math.random()) + "";
      let sign = this.$sha256(
        this.$md5(sessionStorage.getItem("session")) +
          timestamp +
          sessionStorage.getItem("key") +
          rand
      );
      request({
        url: "/api/data/querycount/" + sessionStorage.getItem("session"),
        method: "get",
        headers: {
          timestamp: timestamp,
          rand: rand,
          sign: sign,
        },
      }).then((response) => {
        console.log(response);
        let date = [];
        let time = [];
        response.data.data.forEach((item) => {
          date.push(item.date);
          time.push(item.count);
        });
        console.log(date);
        console.log(time);
        this.chartOption = {
          title: {
            text: "浏览次数统计",
          },
          tooltip: {},
          xAxis: {
            data: date,
          },
          yAxis: {},
          series: [
            {
              name: "浏览次数",
              type: "bar",
              data: time,
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
