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
      backgroundColor: "#2f378f",
      hoverBackgroundColor: "#3c47b3",
      borderColor: "#2f378f",
      borderWidth: 1,
      borderRadius: 2,
      barThickness: 18,
      maxBarThickness: 20,
    },
  ],
}));

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  indexAxis: "y" as const,
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
      beginAtZero: true,
      border: {
        display: false,
      },
      ticks: {
        color: "#64748b",
        font: {
          size: 11,
        },
      },
      grid: {
        color: "#eef1f4",
        drawBorder: false,
      },
    },
    y: {
      border: {
        display: false,
      },
      ticks: {
        color: "#475569",
        font: {
          size: 11,
          weight: 500,
        },
      },
      grid: {
        display: false,
      },
    },
  },
}));
</script>

<template>
  <div class="h-[320px] w-full">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>
