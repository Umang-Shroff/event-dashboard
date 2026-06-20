<script setup lang="ts">
import { computed } from "vue";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const props = defineProps<{
  userIds: string[];
  events: number[];
}>();

const colors = [
  "#2f378f",
  "#5964c7",
  "#7c88dd",
  "#9ba4ea",
  "#16a34a",
  "#f59e0b",
];

const chartData = computed(() => ({
  labels: props.userIds,
  datasets: [
    {
      label: "Events",
      data: props.events,
      backgroundColor: props.events.map((_, i) => colors[i % colors.length]),
      hoverBackgroundColor: "#3c47b3",
      borderRadius: 3,
      borderSkipped: false,
      barThickness: 14,
      maxBarThickness: 18,
    },
  ],
}));

const chartOptions = {
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
        display: false,
      },
      ticks: {
        color: "#475569",
        font: {
          size: 11,
          weight: 500,
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
