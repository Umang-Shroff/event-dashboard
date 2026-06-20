<script setup lang="ts">
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { computed } from "vue";
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
      backgroundColor: ["#2f378f", "#5964c7", "#7c88dd", "#9ba4ea"],
      borderColor: "#ffffff",
      borderWidth: 2,
      hoverOffset: 6,
    },
  ],
}));

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: {
      top: 8,
      right: 8,
      bottom: 8,
      left: 8,
    },
  },
  plugins: {
    tooltip: {
      enabled: true,
      backgroundColor: "#1e293b",
      titleColor: "#ffffff",
      bodyColor: "#ffffff",
      padding: 10,
      displayColors: true,
      cornerRadius: 4,
    },
    legend: {
      display: true,
      position: "bottom" as const,
      labels: {
        color: "#475569",
        boxWidth: 12,
        boxHeight: 12,
        padding: 14,
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
    <Pie :data="chartData" :options="chartOptions" />
  </div>
</template>
