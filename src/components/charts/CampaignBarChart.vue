<script setup lang="ts">
import { computed } from "vue";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
);

const props = defineProps<{
  labels: string[];
  values: number[];
}>();

const chartData = computed(() => ({
  labels: props.labels,
  datasets: [
    {
      label: "Clicks",
      data: props.values,
      backgroundColor: "#3b82f6",
      borderRadius: 6,
    },
  ],
}));

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  indexAxis: "y" as const,
  plugins: {
    tooltip: {
      enabled: true,
    },
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      beginAtZero: true,
      grid: {
        display: true,
      },
    },
    y: {
      grid: {
        display: false,
      },
    },
  },
}));
</script>

<template>
  <div style="height: 350px">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>
