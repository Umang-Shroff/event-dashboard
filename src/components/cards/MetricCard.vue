<script setup lang="ts">
defineProps<{
  title: string;
  value: string | number;
}>();
</script>

<template>
  <div class="bg-white rounded border border-[#dfe3e8] px-5 py-4">
    <p class="text-[11px] font-medium text-slate-500 uppercase tracking-wide">
      {{ title }}
    </p>

    <h2 class="mt-2 text-3xl font-semibold text-slate-700 leading-none">
      {{ value }}
    </h2>
  </div>
</template>
