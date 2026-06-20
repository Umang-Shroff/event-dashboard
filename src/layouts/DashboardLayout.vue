<script setup lang="ts">
import { Menu, PanelLeftClose } from "lucide-vue-next";
import { ref, watch, nextTick } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const mainScroll = ref<HTMLElement | null>(null);
const sidebarOpen = ref(true);

watch(
  () => route.fullPath,
  async () => {
    await nextTick();
    if (mainScroll.value) {
      mainScroll.value.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  },
);
</script>

<template>
  <div class="h-screen bg-[#f4f5f7] flex overflow-hidden">
    <!-- SIDEBAR -->
    <aside
      v-if="sidebarOpen"
      class="w-64 bg-[#f7f8fa] border-r border-[#dfe3e8] shrink-0 relative flex flex-col"
    >
      <button
        class="absolute top-5 right-3 p-1.5 rounded hover:bg-[#e9edf2] cursor-pointer text-slate-500"
        @click="sidebarOpen = false"
      >
        <PanelLeftClose :size="18" />
      </button>

      <div
        class="h-14 flex items-center px-5 text-sm font-semibold text-[#2f378f] border-b border-[#dfe3e8]"
      >
        CleverTap Demo
      </div>

      <nav class="p-3 space-y-1">
        <router-link
          to="/"
          class="block px-3 py-2 text-[13px] rounded text-slate-700 hover:bg-[#edf1f5]"
          exact-active-class="bg-[#e8edf8] text-[#2f378f] font-medium border-l-4 border-[#2f378f]"
        >
          Dashboard
        </router-link>

        <router-link
          to="/analytics"
          class="block px-3 py-2 text-[13px] rounded text-slate-700 hover:bg-[#edf1f5]"
          active-class="bg-[#e8edf8] text-[#2f378f] font-medium border-l-4 border-[#2f378f]"
        >
          Analytics
        </router-link>

        <router-link
          to="/campaigns"
          class="block px-3 py-2 text-[13px] rounded text-slate-700 hover:bg-[#edf1f5]"
          active-class="bg-[#e8edf8] text-[#2f378f] font-medium border-l-4 border-[#2f378f]"
        >
          Campaigns
        </router-link>

        <router-link
          to="/users"
          class="block px-3 py-2 text-[13px] rounded text-slate-700 hover:bg-[#edf1f5]"
          active-class="bg-[#e8edf8] text-[#2f378f] font-medium border-l-4 border-[#2f378f]"
        >
          Users
        </router-link>
      </nav>
    </aside>

    <div class="flex-1 flex flex-col min-w-0">
      <div
        class="h-7 bg-[#ff5c61] text-white text-[11px] flex items-center px-4 border-b border-[#ef4f54]"
      >
        Demo Account • Analytics Dashboard
      </div>

      <header
        class="h-12 bg-[#2f378f] border-b border-[#28307f] flex items-center px-4"
      >
        <button
          v-if="!sidebarOpen"
          @click="sidebarOpen = true"
          class="p-1.5 rounded hover:bg-white/10 text-white cursor-pointer"
        >
          <Menu :size="18" />
        </button>

        <div class="ml-3 text-white text-sm font-medium">Dashboard</div>
      </header>

      <main ref="mainScroll" class="flex-1 overflow-y-auto p-6">
        <router-view />
      </main>
    </div>
  </div>
</template>
