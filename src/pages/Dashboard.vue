<script setup lang="ts">
import DashboardLayout from "../layouts/DashboardLayout.vue";
import MetricCard from "../components/cards/MetricCard.vue";

import { dashboardMetrics } from "../api/analytics";
</script>

<template>
  <DashboardLayout>
    <h1 class="text-3xl font-bold mb-6">Analytics Dashboard</h1>

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
