import type {
  DashboardMetrics,
  EventTypeData,
  TenantData,
  RevenueData,
  HourlyData,
  TopUser,
  CampaignData,
} from "../types/analytics";

export const dashboardMetrics: DashboardMetrics = {
  totalEvents: 1000,
  totalRevenue: 712788,
  activeTenants: 4,
  eventTypes: 4,
};

export const eventTypes: EventTypeData[] = [
  { eventType: "PURCHASE", count: 269 },
  { eventType: "APP_OPEN", count: 259 },
  { eventType: "USER_LOGIN", count: 250 },
  { eventType: "CAMPAIGN_CLICK", count: 222 },
];

export const tenants: TenantData[] = [
  { tenantId: "tenant-1", count: 266 },
  { tenantId: "tenant-2", count: 242 },
  { tenantId: "tenant-3", count: 250 },
  { tenantId: "tenant-4", count: 242 },
];

export const revenue: RevenueData[] = [
  {
    date: "2026-06-16",
    revenue: 712788,
  },
];

export const hourlyEvents: HourlyData[] = [
  {
    hour: "15:00",
    count: 1000,
  },
];

export const topUsers: TopUser[] = [
  { userId: "user135", count: 2 },
  { userId: "user412", count: 2 },
  { userId: "user104", count: 2 },
  { userId: "user118", count: 2 },
  { userId: "user423", count: 2 },
];

export const campaigns: CampaignData[] = [
  { campaignId: "campaign-19", clicks: 16 },
  { campaignId: "campaign-18", clicks: 15 },
  { campaignId: "campaign-12", clicks: 14 },
  { campaignId: "campaign-2", clicks: 14 },
];
