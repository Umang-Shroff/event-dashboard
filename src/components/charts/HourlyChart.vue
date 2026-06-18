<script setup lang="ts">
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "vue-chartjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
);

const props = defineProps<{
  labels: string[];
  values: number[];
}>();

const chartData = {
  labels: props.labels,
  datasets: [
    {
      label: "Events",
      data: props.values,
      tension: 0.3,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
};
</script>

<template>
  <div class="h-80">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>
