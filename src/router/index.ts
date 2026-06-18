import { createRouter, createWebHistory } from "vue-router";

import DashboardLayout from "../layouts/DashboardLayout.vue";

import Dashboard from "../pages/Dashboard.vue";
import Analytics from "../pages/Analytics.vue";
import Campaigns from "../pages/Campaigns.vue";
import Users from "../pages/Users.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: DashboardLayout,
      children: [
        {
          path: "",
          component: Dashboard,
        },
        {
          path: "analytics",
          component: Analytics,
        },
        {
          path: "campaigns",
          component: Campaigns,
        },
        {
          path: "users",
          component: Users,
        },
      ],
    },
  ],
});

export default router;
