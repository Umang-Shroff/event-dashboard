<script setup lang="ts">
import DashboardLayout from "../layouts/DashboardLayout.vue";
import MetricCard from "../components/cards/MetricCard.vue";
import type {
  EventTypeAnalytics,
  TenantAnalytics,
  RevenueAnalytics,
  CampaignAnalytics,
  HourlyAnalytics,
  PartitionAnalytics,
} from "../types/index.ts";
import { ref, onMounted } from "vue";
import {
  getOverview,
  getEventTypes,
  getTenantAnalytics,
  getRevenueAnalytics,
  getCampaignAnalytics,
  getHourlyAnalytics,
  getPartitionAnalytics,
} from "../api/dashboard.ts";

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
const campaigns = ref<CampaignAnalytics[]>([]);
const hourly = ref<HourlyAnalytics[]>([]);
const partitions = ref<PartitionAnalytics[]>([]);

onMounted(async () => {
  try {
    overview.value = await getOverview();
    eventTypes.value = await getEventTypes();
    tenants.value = await getTenantAnalytics();
    revenue.value = await getRevenueAnalytics();
    campaigns.value = await getCampaignAnalytics();
    hourly.value = await getHourlyAnalytics();
    partitions.value = await getPartitionAnalytics();

    console.log("Revenue: ", revenue);
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
    <h1 class="text-3xl font-bold mb-6">Analytics Dashboard</h1>
    <!-- OVERVIEW INFO -->
    <div class="grid grid-cols-4 gap-4">
      <MetricCard title="Total Events" :value="overview.totalEvents" />

      <MetricCard title="Revenue" :value="'₹' + overview.totalRevenue" />

      <MetricCard title="Tenants" :value="overview.totalTenants" />

      <MetricCard title="Users" :value="overview.totalUsers" />
    </div>
    <!-- EVENT TYPE INFO -->
    <div class="mt-10">
      <h2 class="text-xl font-bold mb-4">Event Type Distribution</h2>

      <table class="w-full border">
        <thead>
          <tr>
            <th class="border p-2">Event Type</th>
            <th class="border p-2">Count</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="event in eventTypes" :key="event.eventType">
            <td class="border p-2">
              {{ event.eventType }}
            </td>

            <td class="border p-2">
              {{ event.count }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- TENANTS INFO -->
    <div class="mt-10">
      <h2 class="text-xl font-bold mb-4">Tenant Distribution</h2>

      <table class="w-full border">
        <thead>
          <tr>
            <th class="border p-2">Tenant</th>

            <th class="border p-2">Events</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="tenant in tenants" :key="tenant.tenantId">
            <!-- <td class="border p-2">
              {{ tenant.tenantId }}
            </td> -->
            <td class="border p-2">
              {{ tenantNames[tenant.tenantId] }}
            </td>
            <td class="border p-2">
              {{ tenant.events }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- REVENUE INFO -->
    <div class="mt-10">
      <h2 class="text-xl font-bold mb-4">Revenue Analytics</h2>

      <div class="grid grid-cols-3 gap-4">
        <MetricCard title="Total Revenue" :value="'₹' + revenue.totalRevenue" />

        <MetricCard title="Purchase Events" :value="revenue.purchaseCount" />

        <MetricCard
          title="Average Order Value"
          :value="'₹' + revenue.averageOrderValue.toFixed(2)"
        />
      </div>
    </div>
    <!-- CAMPAIGN INFO -->
    <div class="mt-10">
      <h2 class="text-xl font-bold mb-4">Campaign Analytics</h2>

      <table class="w-full border">
        <thead>
          <tr>
            <th class="border p-2">Campaign</th>
            <th class="border p-2">Clicks</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="campaign in campaigns" :key="campaign.campaignId">
            <td class="border p-2">
              {{ campaign.campaignId }}
            </td>

            <td class="border p-2">
              {{ campaign.clicks }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- HOURLY INFO -->
    <div class="mt-10">
      <h2 class="text-xl font-bold mb-4">Hourly Analytics</h2>

      <table class="w-full border">
        <thead>
          <tr>
            <th class="border p-2">Hour</th>
            <th class="border p-2">Events</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="entry in hourly" :key="entry.hour">
            <td class="border p-2">
              {{ entry.hour }}
            </td>

            <td class="border p-2">
              {{ entry.count }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- PARTITION INFO -->
    <div class="mt-10">
      <h2 class="text-xl font-bold mb-4">Partition Distribution</h2>

      <table class="w-full border">
        <thead>
          <tr>
            <th class="border p-2">Partition</th>

            <th class="border p-2">Events</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="partition in partitions" :key="partition.partitionId">
            <td class="border p-2">
              {{ partition.partitionId }}
            </td>

            <td class="border p-2">
              {{ partition.events }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </DashboardLayout>
</template>
