<script setup lang="ts">
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { computed } from "vue";

import { Bar } from "vue-chartjs";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const props = defineProps<{
  labels: string[];
  values: number[];
}>();

const chartData = computed(() => ({
  labels: props.labels,
  datasets: [
    {
      label: "Partitions",
      data: props.values,
      backgroundColor: "#2f378f",
      hoverBackgroundColor: "#3c47b3",
      borderRadius: 3,
      barThickness: 18,
      maxBarThickness: 22,
    },
  ],
}));

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: {
      top: 8,
      right: 12,
      bottom: 4,
      left: 4,
    },
  },
  plugins: {
    tooltip: {
      enabled: true,
      backgroundColor: "#1e293b",
      titleColor: "#ffffff",
      bodyColor: "#ffffff",
      padding: 10,
      displayColors: false,
      cornerRadius: 4,
    },
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        color: "#eef1f4",
        drawBorder: false,
      },
      ticks: {
        color: "#64748b",
        font: {
          size: 11,
        },
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        color: "#eef1f4",
        drawBorder: false,
      },
      ticks: {
        color: "#64748b",
        font: {
          size: 11,
        },
      },
    },
  },
};
</script>

<template>
  <div class="h-[320px] w-full">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>
