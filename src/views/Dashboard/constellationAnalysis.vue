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
      sessionStorage.setItem("session", "d5104dc76695721d");
      let timestamp = new Date().getTime();
      let rand = Math.ceil(100000000000 * Math.random()) + "";
      let sign = this.$sha256(
        this.$md5(sessionStorage.getItem("session")) +
          timestamp +
          sessionStorage.getItem("key") +
          rand
      );
      request({
        url: "/api/data/starcount/" + sessionStorage.getItem("session"),
        method: "get",
        headers: {
          timestamp: timestamp,
          rand: rand,
          sign: sign,
        },
      }).then((response) => {
        let name = [];
        let count = [];
        response.data.data.forEach((item) => {
          name.push(item.name);
          count.push(item.count);
        });
        this.chartOption = {
          title: {
            text: "星座查询统计",
          },
          tooltip: {},
          xAxis: {
            data: name,
          },
          yAxis: {},
          series: [
            {
              name: "次数",
              type: "bar",
              data: count,
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
