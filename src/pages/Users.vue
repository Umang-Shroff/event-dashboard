<script setup lang="ts">
import { ref, onMounted, computed } from "vue";

import {
  getOverview,
  getTopUsers,
  getDeviceAnalytics,
} from "../api/dashboard.ts";

import MetricCard from "../components/cards/MetricCard.vue";
import AnalyticsCard from "../components/cards/AnalyticsCard.vue";

import UserChart from "../components/charts/UserChart.vue";
import DeviceChart from "../components/charts/DeviceChart.vue";
import type { UserAnalytics } from "../types/user.ts";
import type { DeviceAnalytics } from "../types/device.ts";

const overview = ref({
  totalEvents: 0,
  totalUsers: 0,
  totalTenants: 0,
  totalRevenue: 0,
});

const users = ref<UserAnalytics[]>([]);
const devices = ref<DeviceAnalytics[]>([]);

onMounted(async () => {
  try {
    const [overviewData, userAnalytics, deviceAnalytics] = await Promise.all([
      getOverview(),
      getTopUsers(),
      getDeviceAnalytics(),
    ]);

    overview.value = overviewData;
    users.value = userAnalytics;
    devices.value = deviceAnalytics;
  } catch (error) {
    console.error(error);
  }
});

const totalDeviceEvents = computed(() =>
  devices.value.reduce((sum, device) => sum + device.events, 0),
);
</script>

<template>
  <div class="space-y-6">
    <h1 class="text-3xl mb-6 font-bold">User Analytics</h1>

    <!-- USER METRICS -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <MetricCard title="Total Users" :value="overview.totalUsers" />

      <!-- Placeholder until Active Users API exists -->
      <MetricCard title="Active Users" value="N/A" />
    </div>

    <!-- DEVICE DISTRIBUTION -->
    <AnalyticsCard title="Device Distribution">
      <h2 class="text-xl text-slate-800/80 font-bold mb-8">
        Device Distribution
      </h2>

      <DeviceChart
        :devices="devices.map((d) => d.device)"
        :events="devices.map((d) => d.events)"
      />
    </AnalyticsCard>

    <!-- USER LEADERBOARD -->
    <AnalyticsCard title="User Leaderboard">
      <h2 class="text-xl text-slate-800/80 font-bold mb-8">User Leaderboard</h2>

      <UserChart
        :user-ids="users.map((u) => u.userId)"
        :events="users.map((u) => u.events)"
      />
    </AnalyticsCard>

    <!-- DEVICE DETAILS -->
    <AnalyticsCard title="Device Details">
      <table class="w-full">
        <thead>
          <tr class="border-b">
            <th class="text-left p-3">Device</th>
            <th class="text-left p-3">Events</th>
            <th class="text-left p-3">Share</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="device in devices" :key="device.device" class="border-b">
            <td class="p-2">
              {{ device.device }}
            </td>

            <td class="p-2">
              {{ device.events }}
            </td>

            <td class="p-2">
              {{
                totalDeviceEvents
                  ? ((device.events * 100) / totalDeviceEvents).toFixed(2)
                  : "0.00"
              }}%
            </td>
          </tr>
        </tbody>
      </table>
    </AnalyticsCard>

    <!-- USER DETAILS -->
    <AnalyticsCard title="User Details">
      <table class="w-full">
        <thead>
          <tr class="border-b">
            <th class="text-left p-3">User ID</th>
            <th class="text-left p-3">Events</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="user in users" :key="user.userId" class="border-b">
            <td class="p-2">
              {{ user.userId }}
            </td>

            <td class="p-2">
              {{ user.events }}
            </td>
          </tr>
        </tbody>
      </table>
    </AnalyticsCard>
  </div>
</template>
