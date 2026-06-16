export interface DashboardMetrics {
  totalEvents: number;
  totalRevenue: number;
  activeTenants: number;
  eventTypes: number;
}

export interface EventTypeData {
  eventType: string;
  count: number;
}

export interface TenantData {
  tenantId: string;
  count: number;
}

export interface RevenueData {
  date: string;
  revenue: number;
}

export interface HourlyData {
  hour: string;
  count: number;
}

export interface TopUser {
  userId: string;
  count: number;
}

export interface CampaignData {
  campaignId: string;
  clicks: number;
}
