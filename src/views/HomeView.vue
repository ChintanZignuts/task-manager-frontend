<script setup lang="ts">
import { Card, Button } from "primevue";
// import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// Sample stats
// const totalTasks = ref(25);
// const completedTasks = ref(12);
// const pendingTasks = ref(totalTasks.value - completedTasks.value);
</script>

<template>
  <div class="container mx-auto p-5">
    <!-- Hero Section -->
    <Card class="text-center p-6 shadow-lg">
      <template #content>
        <h1 class="text-3xl font-bold text-gray-800">
          Welcome to Task Manager
        </h1>
        <p class="text-gray-600 mt-2">
          Organize, track, and complete your tasks efficiently!
        </p>
        <Button
          label="Get Started"
          icon="pi pi-arrow-right"
          class="mt-4"
          @click="router.push('/tasks')"
        />
      </template>
    </Card>
  </div>
</template>
