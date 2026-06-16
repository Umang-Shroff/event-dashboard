<script setup lang="ts">
defineProps<{
  title: string;
  value: string | number;
}>();
</script>

<template>
  <div class="bg-white rounded-xl shadow p-5">
    <p class="text-gray-500">
      {{ title }}
    </p>

    <h2 class="text-3xl font-bold mt-2">
      {{ value }}
    </h2>
  </div>
</template>
