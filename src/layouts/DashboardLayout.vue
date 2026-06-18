<script setup lang="ts">
import { Menu, MenuIcon, PanelLeftClose } from "lucide-vue-next";
import { ref } from "vue";

const sidebarOpen = ref(true);
</script>

<template>
  <div class="h-screen bg-slate-100 flex">
    <!-- SIDEBAR -->
    <aside v-if="sidebarOpen" class="w-64 bg-white border-r shrink-0 relative">
      <button
        class="absolute top-7 text-blue-800 right-4 p-1 rounded hover:bg-blue-100 cursor-pointer opacity-80"
        @click="sidebarOpen = false"
      >
        <PanelLeftClose :size="20" />
      </button>
      <div class="p-6 text-xl font-bold">CleverTap Demo</div>

      <nav class="space-y-2 p-4">
        <router-link
          to="/"
          class="block p-3 rounded hover:bg-slate-100"
          exact-active-class="bg-blue-100 text-blue-700 font-semibold"
        >
          Dashboard
        </router-link>

        <router-link
          to="/analytics"
          class="block p-3 rounded hover:bg-slate-100"
          active-class="bg-blue-100 text-blue-700 font-semibold"
        >
          Analytics
        </router-link>

        <router-link
          to="/campaigns"
          class="block p-3 rounded hover:bg-slate-100"
          active-class="bg-blue-100 text-blue-700 font-semibold"
        >
          Campaigns
        </router-link>

        <router-link
          to="/users"
          class="block p-3 rounded hover:bg-slate-100"
          active-class="bg-blue-100 text-blue-700 font-semibold"
        >
          Users
        </router-link>
      </nav>
    </aside>

    <div class="flex-1 flex flex-col">
      <div v-if="!sidebarOpen" class="p-4">
        <header class="h-14 bg-white border-b flex items-center px-4">
          <button
            v-if="!sidebarOpen"
            @click="sidebarOpen = true"
            class="p-2 rounded hover:bg-blue-100 cursor-pointer"
          >
            <Menu :size="20" />
          </button>
        </header>
      </div>

      <main class="flex-1 overflow-y-auto p-6">
        <router-view />
      </main>
    </div>
  </div>
</template>
