<template>
  <div class="min-h-screen bg-slate-100 flex">
    <!-- SIDEBAR -->
    <aside class="w-64 bg-white border-r">
      <div class="p-6 text-xl font-bold">CleverTap Demo</div>

      <nav class="space-y-2 p-4">
        <div class="p-3 rounded bg-slate-100">Dashboard</div>

        <div class="p-3">Analytics</div>

        <div class="p-3">Campaigns</div>

        <div class="p-3">Users</div>
      </nav>
    </aside>

    <!-- MAIN CONTENT AREA -->
    <main class="flex-1 p-6">
      <slot />
    </main>
  </div>
</template>
