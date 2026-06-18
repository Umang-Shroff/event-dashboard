<script setup lang="ts">
import MetricCard from "../components/cards/MetricCard.vue";
import type {
  EventTypeAnalytics,
  TenantAnalytics,
  RevenueAnalytics,
} from "../types/index.ts";
import { ref, onMounted } from "vue";
import {
  getOverview,
  getTenantAnalytics,
  getRevenueAnalytics,
} from "../api/dashboard.ts";

import AnalyticsCard from "../components/cards/AnalyticsCard.vue";
import TenantChart from "../components/charts/TenantChart.vue";
import EventTypeChart from "../components/charts/EventTypeChart.vue";

const overview = ref({
  totalEvents: 0,
  totalUsers: 0,
  totalTenants: 0,
  totalRevenue: 0,
});
const eventTypes = ref<EventTypeAnalytics[]>([]);
const tenants = ref<TenantAnalytics[]>([]);
const revenue = ref<RevenueAnalytics>({
  totalRevenue: 0,
  purchaseCount: 0,
  averageOrderValue: 0,
});

onMounted(async () => {
  try {
    overview.value = await getOverview();
    revenue.value = await getRevenueAnalytics();
    tenants.value = await getTenantAnalytics();
  } catch (error) {
    console.error(error);
  }
});

const tenantNames: Record<string, string> = {
  "tenant-1": "Zomato",
  "tenant-2": "Blinkit",
  "tenant-3": "Swiggy",
  "tenant-4": "Myntra",
};
</script>

<template>
  <DashboardLayout>
    <h1 class="text-3xl font-bold mb-6">Dashboard</h1>
    <!-- OVERVIEW INFO -->
    <div class="grid grid-cols-4 gap-4">
      <MetricCard title="Total Events" :value="overview.totalEvents" />

      <MetricCard title="Revenue" :value="'₹' + overview.totalRevenue" />

      <MetricCard title="Tenants" :value="overview.totalTenants" />

      <MetricCard title="Users" :value="overview.totalUsers" />
    </div>

    <!-- REVENUE INFO -->
    <!-- <div class="mt-10"> -->
    <AnalyticsCard title="Revenue Analytics" class="mt-8">
      <h2 class="text-xl font-bold mb-4">Revenue Analytics</h2>

      <div class="grid grid-cols-3 gap-4">
        <MetricCard title="Total Revenue" :value="'₹' + revenue.totalRevenue" />

        <MetricCard title="Purchase Events" :value="revenue.purchaseCount" />

        <MetricCard
          title="Average Order Value"
          :value="'₹' + revenue.averageOrderValue.toFixed(2)"
        />
      </div>
    </AnalyticsCard>
    <!-- </div> -->

    <!-- CHARTS -->
    <div class="grid grid-cols-2 gap-6">
      <AnalyticsCard title="Event Type Distribution">
        <EventTypeChart
          :labels="eventTypes.map((e) => e.eventType)"
          :values="eventTypes.map((e) => e.count)"
        />
      </AnalyticsCard>

      <AnalyticsCard title="Tenant Distribution">
        <TenantChart
          :labels="tenants.map((t) => tenantNames[t.tenantId])"
          :values="tenants.map((t) => t.events)"
        />
      </AnalyticsCard>
    </div>
  </DashboardLayout>
</template>
