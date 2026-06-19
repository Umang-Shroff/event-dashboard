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
  <div class="space-y-6">
    <h1 class="text-3xl mb-6 font-bold">User Analytics</h1>

    <!-- USER METRICS -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <MetricCard title="Total Users" :value="overview.totalUsers" />

      <MetricCard title="Events Per User" :value="eventsPerUser" />
    </div>

    <!-- DEVICE SECTION -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
      <!-- DEVICE PIE CHART -->
      <AnalyticsCard title="Device Distribution">
        <h2 class="text-xl text-slate-800/80 font-bold mb-8">
          Device Distribution
        </h2>

        <DeviceChart
          :devices="devices.map((d) => d.device)"
          :events="devices.map((d) => d.events)"
        />
      </AnalyticsCard>

      <!-- DEVICE TABLE (CLEAN CENTERED) -->
      <AnalyticsCard title="Device Breakdown">
        <h2 class="text-xl font-bold text-slate-800/80 mb-6">
          Device Breakdown
        </h2>

        <div class="flex items-center justify-center">
          <div class="w-full space-y-2">
            <!-- Header Row -->
            <div
              class="grid grid-cols-3 px-4 py-6 text-xs font-semibold border-b border-slate-400 shadow-md uppercase tracking-wider text-slate-500"
            >
              <div>Device</div>
              <div class="text-center">Events</div>
              <div class="text-right">Share</div>
            </div>

            <!-- Data Rows -->
            <div
              v-for="device in devices"
              :key="device.device"
              class="grid grid-cols-3 items-center mt-5 px-4 py-3 rounded-xl bg-white shadow-sm border border-slate-100 hover:shadow-md hover:bg-slate-50 transition-all"
            >
              <!-- Device Name -->
              <div class="font-medium text-slate-700 truncate">
                {{ device.device === "" ? "Unknown Device" : device.device }}
              </div>

              <!-- Events -->
              <div class="text-center font-semibold text-slate-600">
                {{ device.events }}
              </div>

              <!-- Percentage -->
              <div class="text-right text-sm font-semibold text-slate-500">
                {{
                  totalDeviceEvents
                    ? ((device.events * 100) / totalDeviceEvents).toFixed(2)
                    : "0.00"
                }}%
              </div>
            </div>
          </div>
        </div>
      </AnalyticsCard>
    </div>

    <!-- USER LEADERBOARD -->
    <AnalyticsCard title="User Leaderboard">
      <h2 class="text-xl text-slate-800/80 font-bold mb-8">User Leaderboard</h2>

      <UserChart
        :user-ids="users.map((u) => u.userId)"
        :events="users.map((u) => u.events)"
      />
    </AnalyticsCard>

    <!-- TOP USERS TABLE -->
    <AnalyticsCard title="Top Users">
      <h2 class="text-xl text-slate-800/80 font-bold mb-8">Top Users</h2>

      <!-- CENTER CONTAINER -->
      <div class="flex justify-center">
        <div
          class="w-full max-w-lg overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm"
        >
          <!-- Header -->
          <div
            class="flex items-center px-4 py-3 bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500"
          >
            <div class="flex-1">User ID</div>
            <div class="w-20 text-center">Events</div>
          </div>

          <!-- Rows -->
          <div>
            <div
              v-for="user in users"
              :key="user.userId"
              class="flex items-center px-4 py-3 border-t border-slate-100 hover:bg-slate-50 transition"
            >
              <div class="flex-1 font-medium text-slate-700 truncate">
                {{ user.userId }}
              </div>

              <div class="w-20 text-center font-semibold text-slate-600">
                {{ user.events }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnalyticsCard>
  </div>
</template>
