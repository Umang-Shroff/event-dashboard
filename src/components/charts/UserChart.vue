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
  "#5B6CFF",
  "#2A9D8F",
  "#E76F51",
  "#8D6EFD",
  "#D9779B",
  "#457B9D",
];

const chartData = computed(() => ({
  labels: props.userIds,
  datasets: [
    {
      label: "Events",
      data: props.events,
      backgroundColor: props.events.map((_, i) => colors[i % colors.length]),
      borderRadius: 8,
      borderSkipped: false,
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
  <div class="h-80">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>
