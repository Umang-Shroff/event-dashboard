<script setup lang="ts">
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { computed, watchEffect } from "vue";
import { Pie } from "vue-chartjs";

ChartJS.register(ArcElement, Tooltip, Legend);

const props = defineProps<{
  labels: string[];
  values: number[];
}>();

const chartData = computed(() => ({
  labels: props.labels,
  datasets: [
    {
      data: props.values,
      backgroundColor: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"],
    },
  ],
}));

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
};
</script>

<template>
  <div>
    <div class="h-80">
      <Pie :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>
