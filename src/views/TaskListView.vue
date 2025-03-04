<script setup lang="ts">
import { ref } from "vue";
import { Button, Card } from "primevue";
import { useToast } from "primevue/usetoast";
import TaskAddEditModal from "@/components/TaskAddEditModal.vue";

const toast = useToast();
const dialogVisible = ref(false);
const editingTask = ref(null);
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
const editTask = (task) => {
  editingTask.value = { ...task };
  dialogVisible.value = true;
};

const deleteTask = (taskId) => {
  tasks.value = tasks.value.filter((task) => task.id !== taskId);
  toast.add({
    severity: "info",
    summary: "Task Deleted",
    detail: "Task has been removed.",
    life: 2000,
  });
};
</script>

<template>
  <div class="container mx-auto p-5">
    <div class="flex justify-between items-center mb-5">
      <h2 class="text-3xl font-bold text-center mb-5">Task Board</h2>
      <Button @click="dialogVisible = true">Add Task</Button>
    </div>

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
          class="p-3 bg-white rounded-md shadow-md mb-2 cursor-pointer border hover:bg-gray-50 flex justify-between items-center"
        >
          <span>{{ task.title }}</span>
          <div class="flex gap-2">
            <Button
              icon="pi pi-pencil"
              class="p-button-text p-button-sm"
              @click="editTask(task)"
            />
            <Button
              icon="pi pi-trash"
              class="p-button-text p-button-sm p-button-danger"
              @click="deleteTask(task.id)"
            />
          </div>
        </div>
        <p
          v-if="!tasks.some((t) => t.status === status)"
          class="text-gray-500 text-center"
        >
          No tasks
        </p>
      </div>
    </div>

    <TaskAddEditModal
      :visible="dialogVisible"
      :taskData="editingTask"
      @update:visible="dialogVisible = $event"
    />
  </div>
</template>
