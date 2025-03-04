<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
import Toast from "primevue/toast";
</script>

<template>
  <div class="layout min-h-screen h-full flex flex-col">
    <Toast />
    <header>
      <NavBar />
    </header>
    <main class="p-4 flex flex-1">
      <slot />
    </main>
    <footer class="mt-auto text-center">© 2025 Task Manager</footer>
  </div>
</template>
