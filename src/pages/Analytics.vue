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
    <div class="space-y-4">
      <div>
        <h1 class="text-xl font-medium text-slate-700">Analytics Overview</h1>

        <p class="text-xs text-slate-500 mt-1">
          Event trends and distribution across tenants and partitions
        </p>
      </div>

      <!-- EVENT TYPE INFO -->
      <AnalyticsCard title="Event Type Distribution">
        <div class="mb-4">
          <h2 class="text-sm font-medium text-slate-700">
            Event Type Distribution
          </h2>
        </div>

        <EventTypeChart
          :labels="eventTypes.map((e) => e.eventType)"
          :values="eventTypes.map((e) => e.count)"
        />
      </AnalyticsCard>

      <!-- TENANTS INFO -->
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

      <!-- HOURLY INFO -->
      <AnalyticsCard title="Hourly Analytics">
        <div class="mb-4">
          <h2 class="text-sm font-medium text-slate-700">Hourly Analytics</h2>
        </div>

        <HourlyChart
          :labels="hourly.map((h) => h.hour)"
          :values="hourly.map((h) => h.count)"
        />
      </AnalyticsCard>

      <!-- PARTITION INFO -->
      <AnalyticsCard title="Partition Distribution">
        <div class="mb-4">
          <h2 class="text-sm font-medium text-slate-700">
            Partition Distribution
          </h2>
        </div>

        <PartitionChart
          :labels="partitions.map((p) => `Partition ${p.partitionId}`)"
          :values="partitions.map((p) => p.events)"
        />
      </AnalyticsCard>
    </div>
  </DashboardLayout>
</template>
