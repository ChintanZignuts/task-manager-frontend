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
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
      <Card class="shadow-lg rounded-xl p-6">
        <template #content>
          <h2 class="text-2xl font-semibold mb-2">Our Mission</h2>
          <p class="text-gray-700">
            Our goal is to provide a seamless and intuitive task management
            solution that helps you stay organized, boost productivity, and
            achieve your goals.
          </p>
        </template>
      </Card>

      <!-- Features Card -->
      <Card class="shadow-lg rounded-xl p-6">
        <template #content>
          <h2 class="text-2xl font-semibold mb-2">Why Choose Us?</h2>
          <ul class="list-disc list-inside text-gray-700">
            <li>Drag & Drop Task Management</li>
            <li>Priority & Due Date Indicators</li>
            <li>Real-Time Updates</li>
            <li>Simple & Clean Interface</li>
          </ul>
        </template>
      </Card>
    </div>
  </div>
</template>
