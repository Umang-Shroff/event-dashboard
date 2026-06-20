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
    devices.value = deviceAnalytics.map((d: DeviceAnalytics) => ({
      ...d,
      device: d.device === "" ? "Unknown Devices" : d.device,
    }));
  } catch (error) {
    console.error(error);
  }
});

const eventsPerUser = computed(() =>
  overview.value.totalUsers
    ? overview.value.totalEvents / overview.value.totalUsers
    : 0,
);

const totalDeviceEvents = computed(() =>
  devices.value.reduce((sum, device) => sum + device.events, 0),
);
</script>

<template>
  <div class="space-y-4">
    <div>
      <h1 class="text-xl font-medium text-slate-700">User Analytics</h1>

      <p class="text-xs text-slate-500 mt-1">
        User activity, engagement and device distribution metrics
      </p>
    </div>

    <!-- USER METRICS -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <MetricCard title="Total Users" :value="overview.totalUsers" />

      <MetricCard title="Events Per User" :value="eventsPerUser" />
    </div>

    <!-- DEVICE SECTION -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
      <!-- DEVICE PIE CHART -->
      <AnalyticsCard title="Device Distribution">
        <div class="mb-4">
          <h2 class="text-sm font-medium text-slate-700">
            Device Distribution
          </h2>
        </div>

        <DeviceChart
          :devices="devices.map((d) => d.device)"
          :events="devices.map((d) => d.events)"
        />
      </AnalyticsCard>

      <!-- DEVICE TABLE -->
      <AnalyticsCard title="Device Breakdown">
        <div class="mb-4">
          <h2 class="text-sm font-medium text-slate-700">Device Breakdown</h2>
        </div>

        <div class="w-full overflow-hidden border border-[#dfe3e8] rounded">
          <!-- Header Row -->
          <div
            class="grid grid-cols-3 px-4 py-3 text-[11px] font-medium uppercase tracking-wide text-slate-500 bg-[#fafbfc] border-b border-[#dfe3e8]"
          >
            <div>Device</div>
            <div class="text-center">Events</div>
            <div class="text-right">Share</div>
          </div>

          <!-- Data Rows -->
          <div
            v-for="device in devices"
            :key="device.device"
            class="grid grid-cols-3 items-center px-4 py-3 border-b border-[#eef1f4] hover:bg-[#fafbfc]"
          >
            <div class="text-sm text-slate-700 truncate">
              {{ device.device }}
            </div>

            <div class="text-center text-sm text-slate-700">
              {{ device.events }}
            </div>

            <div class="text-right text-sm text-slate-600">
              {{
                totalDeviceEvents
                  ? ((device.events * 100) / totalDeviceEvents).toFixed(2)
                  : "0.00"
              }}%
            </div>
          </div>
        </div>
      </AnalyticsCard>
    </div>

    <!-- USER LEADERBOARD -->
    <AnalyticsCard title="User Leaderboard">
      <div class="mb-4">
        <h2 class="text-sm font-medium text-slate-700">User Leaderboard</h2>
      </div>

      <UserChart
        :user-ids="users.map((u) => u.userId)"
        :events="users.map((u) => u.events)"
      />
    </AnalyticsCard>

    <!-- TOP USERS TABLE -->
    <AnalyticsCard title="Top Users">
      <div class="mb-4">
        <h2 class="text-sm font-medium text-slate-700">Top Users</h2>
      </div>

      <div class="w-full overflow-hidden border border-[#dfe3e8] rounded">
        <!-- Header -->
        <div
          class="flex items-center px-4 py-3 bg-[#fafbfc] text-[11px] font-medium uppercase tracking-wide text-slate-500 border-b border-[#dfe3e8]"
        >
          <div class="flex-1">User ID</div>
          <div class="w-24 text-center">Events</div>
        </div>

        <!-- Rows -->
        <div>
          <div
            v-for="user in users"
            :key="user.userId"
            class="flex items-center px-4 py-3 border-b border-[#eef1f4] hover:bg-[#fafbfc]"
          >
            <div class="flex-1 text-sm text-slate-700 truncate">
              {{ user.userId }}
            </div>

            <div class="w-24 text-center text-sm text-slate-700">
              {{ user.events }}
            </div>
          </div>
        </div>
      </div>
    </AnalyticsCard>
  </div>
</template>
