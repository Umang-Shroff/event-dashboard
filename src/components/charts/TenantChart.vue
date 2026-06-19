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

const colors = [
  "#5B6CFF", // Muted Indigo
  "#2A9D8F", // Soft Teal
  "#E76F51", // Terracotta
  "#8D6EFD", // Soft Violet
  "#D9779B", // Dusty Rose
  "#457B9D", // Slate Blue
];

const chartData = computed(() => ({
  labels: props.labels,
  datasets: [
    {
      label: "Events",
      data: props.values,
      backgroundColor: props.values.map((_, i) => colors[i % colors.length]),
      borderRadius: 8,
      borderSkipped: false,
    },
  ],
}));

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  indexAxis: "y" as const,
};
</script>

<template>
  <div class="h-80">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>
