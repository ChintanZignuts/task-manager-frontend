<script setup lang="ts">
import { ref } from "vue";
import { Card } from "primevue/card";
import { Button } from "primevue/button";
import { useToast } from "primevue/usetoast";

const toast = useToast();

// Sample tasks
const tasks = ref([
  { id: 1, title: "Design UI", status: "pending" },
  { id: 2, title: "Setup Database", status: "pending" },
  { id: 3, title: "Develop API", status: "in-progress" },
  { id: 4, title: "Write Documentation", status: "completed" },
]);

const statuses = ref(["pending", "in-progress", "completed"]);

// Drag & Drop Logic
const onDragStart = (event, task) => {
  event.dataTransfer.setData("taskId", task.id);
};

const onDrop = (event, newStatus) => {
  const taskId = event.dataTransfer.getData("taskId");
  const task = tasks.value.find((t) => t.id == taskId);
  if (task) {
    task.status = newStatus;
    toast.add({
      severity: "success",
      summary: "Task Updated",
      detail: `Moved to ${newStatus}`,
      life: 2000,
    });
  }
};
</script>

<template>
  <div class="container mx-auto p-5">
    <h2 class="text-3xl font-bold text-center mb-5">Task Board</h2>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <!-- Task Columns -->
      <div
        v-for="status in statuses"
        :key="status"
        class="p-3 border rounded-lg shadow-md bg-gray-100"
        @dragover.prevent
        @drop="onDrop($event, status)"
      >
        <h3 class="text-xl font-semibold capitalize text-center mb-3">
          {{ status.replace("-", " ") }}
        </h3>

        <div
          v-for="task in tasks.filter((t) => t.status === status)"
          :key="task.id"
          draggable="true"
          @dragstart="onDragStart($event, task)"
          class="p-3 bg-white rounded-md shadow-md mb-2 cursor-pointer border hover:bg-gray-50"
        >
          {{ task.title }}
        </div>

        <p
          v-if="!tasks.some((t) => t.status === status)"
          class="text-gray-500 text-center"
        >
          No tasks
        </p>
      </div>
    </div>
  </div>
</template>
