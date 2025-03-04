<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
</script>

<template>
  <div class="layout min-h-screen h-full flex flex-col">
    <header>
      <NavBar />
    </header>
    <main class="p-4 h-full">
      <slot />
    </main>
    <footer class="mt-auto text-center">© 2025 Task Manager</footer>
  </div>
</template>
