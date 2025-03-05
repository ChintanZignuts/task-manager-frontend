<script setup>
import { Card, Button } from "primevue";
</script>

<template>
  <div class="container mx-auto p-6">
    <h1 class="text-4xl font-bold text-center mb-4">About Our Task Manager</h1>
    <p class="text-lg text-gray-600 text-center mb-8">
      A simple and efficient way to manage your tasks with ease and
      productivity.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Introduction Card -->
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

    <!-- Team Section -->
    <div class="mt-12">
      <h2 class="text-3xl font-semibold text-center mb-6">Meet the Team</h2>
      <div class="w-full flex">
        <Card class="shadow-md rounded-lg p-5 text-center mx-auto">
          <template #content>
            <h3 class="text-xl font-bold">Chintan Rupareliya</h3>
            <p class="text-gray-500">Lead Developer</p>
          </template>
        </Card>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="mt-12 text-center">
      <h2 class="text-3xl font-bold mb-3">Ready to Get Started?</h2>
      <p class="text-gray-600 mb-4">
        Sign up today and take control of your tasks.
      </p>
      <Button
        label="Get Started"
        icon="pi pi-arrow-right"
        class="p-button-primary"
        @click="$router.push('/register')"
      />
    </div>
  </div>
</template>
