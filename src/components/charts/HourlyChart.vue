<script setup lang="ts">
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { computed } from "vue";
import { Line } from "vue-chartjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
);

const props = defineProps<{
  labels: string[];
  values: number[];
}>();

const chartData = computed(() => ({
  labels: props.labels,
  datasets: [
    {
      label: "Events",
      data: props.values,
      borderColor: "#2f378f",
      backgroundColor: "rgba(47, 55, 143, 0.08)",
      pointBackgroundColor: "#2f378f",
      pointBorderColor: "#ffffff",
      pointRadius: 3,
      pointHoverRadius: 5,
      borderWidth: 2,
      fill: true,
      tension: 0.35,
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
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>
