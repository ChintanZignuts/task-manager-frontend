<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Button, Card } from "primevue";
import { useToast } from "primevue/usetoast";
import TaskAddEditModal from "@/components/TaskAddEditModal.vue";
import axiosIns from "@/services/axios.ts";

type Task = {
  id?: number;
  title: string;
  description: string;
  due_date: string | null;
  priority: string;
  status?: string;
};

const toast = useToast();
const dialogVisible = ref(false);
const editingTask = ref<Task>({
  id: undefined,
  title: "",
  description: "",
  due_date: null,
  priority: "medium",
});
const tasks = ref([]);
const isEdit = ref(false);

const statuses = ref(["pending", "in_progress", "completed"]);

// Drag & Drop Logic
const onDragStart = (event, task) => {
  event.dataTransfer.setData("taskId", task.id);
};

const onDrop = async (event, newStatus) => {
  const taskId = event.dataTransfer.getData("taskId");
  const task = tasks.value.find((t) => t.id == taskId);

  if (task && task.status !== newStatus) {
    try {
      // Call API to update task status
      await axiosIns.patch(`/tasks/${task.id}/`, { status: newStatus });

      // Update the local task state
      task.status = newStatus;

      // Show success toast
      toast.add({
        severity: "success",
        summary: "Task Updated",
        detail: `Moved to ${newStatus}`,
        life: 2000,
      });
    } catch (error) {
      console.error("Error updating task status:", error);
      toast.add({
        severity: "error",
        summary: "Update Failed",
        detail: "Could not update task status.",
        life: 2000,
      });
    }
  }
};
const editTask = (task) => {
  isEdit.value = true;
  editingTask.value = { ...task };
  dialogVisible.value = true;
};

const getTasks = async () => {
  try {
    const response = await axiosIns.get("/tasks");
    tasks.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

const getPriorityIcon = (priority: string) => {
  switch (priority) {
    case "high":
      return "pi-exclamation-triangle text-red-500"; // Red
    case "medium":
      return "pi-flag text-yellow-500"; // Yellow
    case "low":
      return "pi-check text-green-500"; // Green
    default:
      return "pi-question-circle text-gray-500"; // Default
  }
};

const deleteTask = async (taskId) => {
  tasks.value = tasks.value.filter((task) => task.id !== taskId);
  axiosIns.delete(`/tasks/${taskId}/`);
  toast.add({
    severity: "info",
    summary: "Task Deleted",
    detail: "Task has been removed.",
    life: 2000,
  });
};

const updateModalVisible = (event) => {
  if (!event) {
    isEdit.value = false;
    editingTask.value = {
      id: undefined,
      title: "",
      description: "",
      due_date: null,
      priority: "medium",
    };
  }
  dialogVisible.value = event;
};

onMounted(() => {
  getTasks();
});
</script>

<template>
  <div class="container mx-auto p-5">
    <div class="flex justify-between items-center mb-5">
      <h2 class="text-3xl font-bold text-center mb-5">Task Board</h2>
      <Button @click="dialogVisible = true">Add Task</Button>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 h-[70vh]">
      <!-- Task Columns -->
      <div
        v-for="status in statuses"
        :key="status"
        class="p-3 border rounded-lg shadow-md bg-gray-100 h-full"
        @dragover.prevent
        @drop="onDrop($event, status)"
      >
        <h3 class="text-xl font-semibold capitalize text-center mb-3">
          {{ status.replace("_", " ") }}
        </h3>

        <div
          v-for="task in tasks.filter((t) => t.status === status)"
          :key="task.id"
          draggable="true"
          @dragstart="onDragStart($event, task)"
          class="p-3 bg-white rounded-md shadow-md mb-2 cursor-pointer border hover:bg-gray-50 flex flex-col gap-2"
        >
          <!-- Task Title & Priority -->
          <div class="flex justify-between items-center">
            <span class="font-semibold">{{ task.title }}</span>
            <span
              class="text-sm font-bold"
              :class="{
                'text-red-500': task.priority === 'high',
                'text-yellow-500': task.priority === 'medium',
                'text-green-500': task.priority === 'low',
              }"
            >
              <i
                class="pi"
                :class="getPriorityIcon(task.priority)"
                v-tooltip.top="task.priority"
              ></i>
            </span>
          </div>

          <!-- Due Date -->
          <div v-if="task.due_date" class="text-gray-500 text-xs">
            Due: {{ new Date(task.due_date).toLocaleDateString() }}
          </div>

          <!-- Buttons -->
          <div class="flex justify-end gap-2">
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
      @update:visible="updateModalVisible($event)"
      @update:task="getTasks"
      :isEdit="isEdit"
    />
  </div>
</template>
