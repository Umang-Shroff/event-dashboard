<script setup lang="ts">
defineProps<{
  title: string;
  subtitle?: string;
}>();
</script>

<template>
  <div class="bg-white rounded border border-[#dfe3e8] overflow-hidden">
    <!-- Header -->
    <div class="px-5 py-3 border-b border-[#eceff3] bg-[#fafbfc]">
      <!-- <h2 class="text-lg font-semibold text-slate-800">
        {{ title }}
      </h2> -->

      <!-- <p v-if="subtitle" class="text-sm text-slate-500 mt-1">
        {{ subtitle }}
      </p> -->
    </div>

    <!-- Content -->
    <div class="p-5">
      <slot />
    </div>
  </div>
</template>
