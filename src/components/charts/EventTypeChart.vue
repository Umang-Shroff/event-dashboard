<script setup lang="ts">
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Pie } from "vue-chartjs";

ChartJS.register(ArcElement, Tooltip, Legend);

const props = defineProps<{
  labels: string[];
  values: number[];
}>();

const chartData = {
  labels: props.labels,
  datasets: [
    {
      data: props.values,
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
    <Pie :data="chartData" :options="chartOptions" />
  </div>
</template>
