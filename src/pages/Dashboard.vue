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
  getEventTypes,
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
    eventTypes.value = await getEventTypes();
    // console.log(
    //   "Events: ",
    //   eventTypes.value.map((e) => e.count),
    // );
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
    <div class="space-y-5">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-xl font-medium text-slate-700">Dashboard</h1>
          <p class="text-xs text-slate-500 mt-1">
            Overview of events, users, revenue and tenant activity
          </p>
        </div>
      </div>

      <!-- OVERVIEW INFO -->
      <div class="grid grid-cols-4 gap-3">
        <MetricCard title="Total Events" :value="overview.totalEvents" />

        <MetricCard title="Revenue" :value="'₹' + overview.totalRevenue" />

        <MetricCard title="Tenants" :value="overview.totalTenants" />

        <MetricCard title="Users" :value="overview.totalUsers" />
      </div>

      <!-- REVENUE INFO -->
      <AnalyticsCard title="Revenue Analytics" class="mt-2">
        <div class="mb-4">
          <h2 class="text-base font-medium text-slate-700">
            Revenue Analytics
          </h2>
        </div>

        <div class="grid grid-cols-3 gap-3">
          <MetricCard
            title="Total Revenue"
            :value="'₹' + revenue.totalRevenue"
          />

          <MetricCard title="Purchase Events" :value="revenue.purchaseCount" />

          <MetricCard
            title="Average Order Value"
            :value="'₹' + revenue.averageOrderValue.toFixed(2)"
          />
        </div>
      </AnalyticsCard>

      <!-- CHARTS -->
      <div class="grid grid-cols-2 gap-4">
        <AnalyticsCard title="Event Type Distribution">
          <div class="mb-4">
            <h2 class="text-sm font-medium text-slate-700">Event Types</h2>
          </div>

          <EventTypeChart
            :labels="eventTypes.map((e) => e.eventType)"
            :values="eventTypes.map((e) => e.count)"
          />
        </AnalyticsCard>

        <AnalyticsCard title="Tenant Distribution">
          <div class="mb-4">
            <h2 class="text-sm font-medium text-slate-700">
              Tenant Distribution
            </h2>
          </div>

          <TenantChart
            :labels="tenants.map((t) => tenantNames[t.tenantId])"
            :values="tenants.map((t) => t.events)"
          />
        </AnalyticsCard>
      </div>
    </div>
  </DashboardLayout>
</template>
