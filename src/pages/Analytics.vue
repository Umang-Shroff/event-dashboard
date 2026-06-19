<script setup lang="ts">
import type {
  EventTypeAnalytics,
  TenantAnalytics,
  HourlyAnalytics,
  PartitionAnalytics,
} from "../types/index.ts";
import { ref, onMounted } from "vue";
import {
  getEventTypes,
  getTenantAnalytics,
  getHourlyAnalytics,
  getPartitionAnalytics,
} from "../api/dashboard.ts";

import AnalyticsCard from "../components/cards/AnalyticsCard.vue";

import EventTypeChart from "../components/charts/EventTypeChart.vue";
import TenantChart from "../components/charts/TenantChart.vue";
import HourlyChart from "../components/charts/HourlyChart.vue";
import PartitionChart from "../components/charts/PartitionChart.vue";

const eventTypes = ref<EventTypeAnalytics[]>([]);
const tenants = ref<TenantAnalytics[]>([]);
const hourly = ref<HourlyAnalytics[]>([]);
const partitions = ref<PartitionAnalytics[]>([]);

onMounted(async () => {
  try {
    tenants.value = await getTenantAnalytics();
    eventTypes.value = await getEventTypes();
    hourly.value = await getHourlyAnalytics();
    partitions.value = await getPartitionAnalytics();
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
    <div class="space-y-6">
      <h1 class="text-3xl font-bold mb-6">Analytics Overview</h1>

      <!-- EVENT TYPE INFO -->
      <div class="mt-10">
        <AnalyticsCard title="Event Type Distribution">
          <h2 class="text-xl text-slate-800/80 font-bold mb-8">Event Types</h2>
          <EventTypeChart
            :labels="eventTypes.map((e) => e.eventType)"
            :values="eventTypes.map((e) => e.count)"
          />
        </AnalyticsCard>
      </div>

      <!-- TENANTS INFO -->
      <div class="mt-10">
        <AnalyticsCard title="Tenant Distribution">
          <h2 class="text-xl text-slate-800/80 font-bold mb-8">
            Tenant Distribution
          </h2>
          <TenantChart
            :labels="tenants.map((t) => tenantNames[t.tenantId])"
            :values="tenants.map((t) => t.events)"
          />
        </AnalyticsCard>
      </div>

      <!-- HOURLY INFO -->
      <div class="mt-10">
        <AnalyticsCard title="Hourly Analytics">
          <h2 class="text-xl text-slate-800/80 font-bold mb-8">
            Hourly Analytics
          </h2>
          <HourlyChart
            :labels="hourly.map((h) => h.hour)"
            :values="hourly.map((h) => h.count)"
          />
        </AnalyticsCard>
      </div>

      <!-- PARTITION INFO -->
      <div class="mt-10">
        <AnalyticsCard title="Partition Distribution">
          <h2 class="text-xl text-slate-800/80 font-bold mb-8">
            Partition Distribution
          </h2>
          <PartitionChart
            :labels="partitions.map((p) => `Partition ${p.partitionId}`)"
            :values="partitions.map((p) => p.events)"
          />
        </AnalyticsCard>
      </div>
    </div>
  </DashboardLayout>
</template>
