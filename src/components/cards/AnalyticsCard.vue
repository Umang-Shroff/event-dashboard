<script setup lang="ts">
defineProps<{
  title: string;
  subtitle?: string;
}>();
</script>

<template>
  <div
    class="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
  >
    <!-- Header -->
    <div
      class="px-6 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white"
    >
      <!-- <h2 class="text-lg font-semibold text-slate-800">
        {{ title }}
      </h2> -->

      <!-- <p v-if="subtitle" class="text-sm text-slate-500 mt-1">
        {{ subtitle }}
      </p> -->
    </div>

    <!-- Content -->
    <div class="p-6">
      <slot />
    </div>
  </div>
</template>
