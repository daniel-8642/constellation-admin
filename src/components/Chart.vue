<template>
  <div ref="chartDom"></div>
</template>

<script>
import echarts from "echarts";
import { addListener, removeListener } from "resize-detector";
import { debounce } from "lodash";

export default {
  name: "Chart",
  props: {
    option: {
      type: Object,
      default: () => {},
    },
  },
  watch: {
    //修改值后需要手动更新值
    option(val) {
      this.chart.setOption(val);
    },

    //深度监听
    // option: {
    //   handler(val) {
    //     this.chart.setOption(val);
    //   },
    //   deep: true,
    // },
  },
  created() {
    this.resize = debounce(this.resize, 150);
  },
  mounted() {
    this.renderChart();
    addListener(this.$refs.chartDom, this.resize);
  },
  beforeDestroy() {
    //处理内存泄露
    removeListener(this.$refs.chartDom, this.resize);
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    resize() {
      console.log("resize");
      this.chart.resize();
    },
    renderChart() {
      // 基于准备好的dom，初始化echarts实例
      this.chart = echarts.init(this.$refs.chartDom);
      this.chart.setOption(this.option);
    },
  },
};
</script>

<style scoped></style>
