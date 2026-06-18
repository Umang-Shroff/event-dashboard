<script setup lang="ts">
import DashboardLayout from "../layouts/DashboardLayout.vue";
import MetricCard from "../components/cards/MetricCard.vue";
import { ref, onMounted } from "vue";
import { dashboardMetrics } from "../api/analytics";
import { checkHealth } from "../api/dashboard.ts";

const status = ref("Checking...");

onMounted(async () => {
  try {
    const data = await checkHealth();
    console.log("Backend connected:", data);
    status.value = "Backend Connected";
  } catch (error) {
    console.error("Backend connection failed:", error);
    status.value = "Backend Not Connected";
  }
});
</script>

<template>
  <DashboardLayout>
    <h1 class="text-3xl font-bold mb-6">Analytics Dashboard</h1>
    <h2>{{ status }}</h2>
    <div class="grid grid-cols-4 gap-4">
      <MetricCard title="Total Events" :value="dashboardMetrics.totalEvents" />

      <MetricCard
        title="Revenue"
        :value="'₹' + dashboardMetrics.totalRevenue"
      />

      <MetricCard title="Tenants" :value="dashboardMetrics.activeTenants" />

      <MetricCard title="Event Types" :value="dashboardMetrics.eventTypes" />
    </div>
  </DashboardLayout>
</template>
