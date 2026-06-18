<script setup lang="ts">
defineProps<{
  title: string;
  value: string | number;
}>();
</script>

<template>
  <div
    class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
  >
    <p class="text-sm font-medium text-slate-500 uppercase tracking-wide">
      {{ title }}
    </p>

    <h2 class="mt-3 text-4xl font-bold text-slate-800">
      {{ value }}
    </h2>
  </div>
</template>
