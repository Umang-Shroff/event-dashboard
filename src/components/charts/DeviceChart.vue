<script setup lang="ts">
import { computed } from "vue";
import { Pie } from "vue-chartjs";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const props = defineProps<{
  devices: string[];
  events: number[];
}>();

const chartData = computed(() => ({
  labels: props.devices,
  datasets: [
    {
      data: props.events,
      backgroundColor: [
        "#3b82f6",
        "#ef4444",
        "#10b981",
        "#f59e0b",
        "#8b5cf6",
        "#14b8a6",
        "#f97316",
      ],
      borderWidth: 1,
    },
  ],
}));

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    tooltip: {
      enabled: true,
    },
    legend: {
      display: true,
      position: "bottom" as const,
    },
  },
}));
</script>

<template>
  <div style="height: 350px">
    <Pie :data="chartData" :options="chartOptions" />
  </div>
</template>
