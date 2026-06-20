<script setup lang="ts">
import type { CampaignAnalytics } from "../types/index.ts";
import { ref, onMounted, computed } from "vue";
import { getCampaignAnalytics } from "../api/dashboard.ts";

import MetricCard from "../components/cards/MetricCard.vue";
import AnalyticsCard from "../components/cards/AnalyticsCard.vue";

import CampaignBarChart from "../components/charts/CampaignBarChart.vue";
import CampaignPieChart from "../components/charts/CampaignPieChart.vue";

const campaigns = ref<CampaignAnalytics[]>([]);

onMounted(async () => {
  try {
    campaigns.value = await getCampaignAnalytics();
  } catch (error) {
    console.error(error);
  }
});

const totalClicks = computed(() =>
  campaigns.value.reduce((sum, campaign) => sum + campaign.clicks, 0),
);
</script>

<template>
  <!-- CAMPAIGN INFO -->
  <div class="space-y-4">
    <div>
      <h1 class="text-xl font-medium text-slate-700">Campaign Analytics</h1>

      <p class="text-xs text-slate-500 mt-1">
        Campaign performance, click distribution and engagement metrics
      </p>
    </div>

    <div class="grid grid-cols-1">
      <MetricCard title="Total Campaign Clicks" :value="totalClicks" />
    </div>

    <div class="grid grid-cols-2 gap-4">
      <!-- BAR CHART -->
      <AnalyticsCard title="Top Campaigns">
        <div class="mb-4">
          <h2 class="text-sm font-medium text-slate-700">Top Campaigns</h2>
        </div>

        <CampaignBarChart
          :labels="campaigns.map((c) => c.campaignId)"
          :values="campaigns.map((c) => c.clicks)"
        />
      </AnalyticsCard>

      <!-- PIE CHART -->
      <AnalyticsCard title="Campaign Share">
        <div class="mb-4">
          <h2 class="text-sm font-medium text-slate-700">Campaign Share</h2>
        </div>

        <CampaignPieChart
          :labels="campaigns.map((c) => c.campaignId)"
          :values="campaigns.map((c) => c.clicks)"
        />
      </AnalyticsCard>
    </div>

    <AnalyticsCard title="Campaign Details">
      <div class="mb-4">
        <h2 class="text-sm font-medium text-slate-700">Campaign Details</h2>
      </div>

      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-[#dfe3e8] bg-[#fafbfc]">
            <th class="text-left px-4 py-3 font-medium text-slate-600">
              Campaign
            </th>

            <th class="text-left px-4 py-3 font-medium text-slate-600">
              Clicks
            </th>

            <th class="text-left px-4 py-3 font-medium text-slate-600">
              Share
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="campaign in campaigns"
            :key="campaign.campaignId"
            class="border-b border-[#eef1f4] hover:bg-[#fafbfc]"
          >
            <td class="px-4 py-3 text-slate-700">
              {{ campaign.campaignId }}
            </td>

            <td class="px-4 py-3 text-slate-700">
              {{ campaign.clicks }}
            </td>

            <td class="px-4 py-3 text-slate-700">
              {{
                totalClicks
                  ? ((campaign.clicks * 100) / totalClicks).toFixed(2)
                  : "0.00"
              }}%
            </td>
          </tr>
        </tbody>
      </table>
    </AnalyticsCard>
  </div>
</template>
