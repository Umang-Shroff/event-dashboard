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
  <div class="space-y-6">
    <h1 class="text-3xl mb-6 font-bold">Campaign Analytics</h1>
    <MetricCard title="Total Campaign Clicks" :value="totalClicks" />

    <!-- BAR CHART -->
    <AnalyticsCard title="Top Campaigns">
      <CampaignBarChart
        :labels="campaigns.map((c) => c.campaignId)"
        :values="campaigns.map((c) => c.clicks)"
      />
    </AnalyticsCard>

    <!-- PIE CHART -->
    <AnalyticsCard title="Campaign Share">
      <CampaignPieChart
        :labels="campaigns.map((c) => c.campaignId)"
        :values="campaigns.map((c) => c.clicks)"
      />
    </AnalyticsCard>

    <AnalyticsCard title="Campaign Details">
      <table class="w-full">
        <thead>
          <tr class="border-b">
            <th class="text-left p-3">Campaign</th>
            <th class="text-left p-3">Clicks</th>
            <th class="text-left p-3">Share</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="campaign in campaigns"
            :key="campaign.campaignId"
            class="border-b"
          >
            <td class="p-2">
              {{ campaign.campaignId }}
            </td>

            <td class="p-2">
              {{ campaign.clicks }}
            </td>

            <td class="p-2">
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
