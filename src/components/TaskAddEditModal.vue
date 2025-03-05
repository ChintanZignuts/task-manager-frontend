<script setup lang="ts">
import { ref, watch } from "vue";
import {
  Dialog,
  InputText,
  Select,
  DatePicker,
  Button,
  Message,
} from "primevue";
import { Form } from "@primevue/forms";
import { yupResolver } from "@primevue/forms/resolvers/yup";
import * as yup from "yup";
import axiosIns from "@/services/axios.ts";

const props = defineProps({
  visible: Boolean,
  taskData: Object,
  isEdit: Boolean,
});

const emit = defineEmits(["update:visible", "update:task"]);

const task = ref({
  title: props.taskData?.title || "",
  description: props.taskData?.description || "",
  due_date: props.taskData?.due_date || null,
  priority: props.taskData?.priority || "medium",
});

const priorityOptions = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
];

const resolver = ref(
  yupResolver(
    yup.object().shape({
      title: yup.string().required("Title is required."),
      description: yup.string().required("Description is required."),
      due_date: yup.date().required("Due date is required."),
      priority: yup
        .string()
        .oneOf(["low", "medium", "high"], "Invalid priority")
        .required("Priority is required."),
    })
  )
);

watch(
  () => props.taskData,
  (newTaskData) => {
    if (newTaskData) {
      task.value = {
        title: newTaskData.title || "",
        description: newTaskData.description || "",
        due_date: newTaskData.due_date || null,
        priority: newTaskData.priority || "medium",
      };
    }
  },
  { deep: true, immediate: true }
);

const submitTask = async ({ valid, values }) => {
  try {
    if (!valid) return;
    const task = {
      ...values,
      due_date: values.due_date
        ? values.due_date.toISOString().split("T")[0]
        : null,
    };
    if (props.isEdit) {
      await axiosIns.put(`/tasks/${props.taskData.id}/`, task);
    } else {
      await axiosIns.post("/tasks/", task);
    }
    emit("update:visible", false);
    emit("update:task");
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <Dialog
    modal
    class="w-full max-w-[25.35rem]"
    :draggable="false"
    :visible="props.visible"
    @update:visible="emit('update:visible', $event)"
  >
    <template #header>
      {{ props.isEdit ? "Edit Task" : "Add Task" }}
    </template>
    <template #default>
      <Form
        v-slot="$form"
        :initial-values="task"
        :resolver="resolver"
        @submit="submitTask"
        class="grid grid-cols-1 gap-4"
      >
        <div class="flex flex-col gap-1">
          <label for="title">Title</label>
          <InputText name="title" v-model="task.title" placeholder="Title" />
          <Message
            v-if="$form.title?.invalid"
            severity="error"
            size="small"
            variant="simple"
          >
            {{ $form.title.error.message }}
          </Message>
        </div>

        <div class="flex flex-col gap-1">
          <label for="description">Description</label>
          <InputText
            name="description"
            v-model="task.description"
            placeholder="Description"
          />
          <Message
            v-if="$form.description?.invalid"
            severity="error"
            size="small"
            variant="simple"
          >
            {{ $form.description.error.message }}
          </Message>
        </div>

        <div class="flex flex-col gap-1">
          <label for="due_date">Due Date</label>
          <DatePicker
            name="due_date"
            v-model="task.due_date"
            dateFormat="yy-mm-dd"
            placeholder="Due Date"
            :showTime="false"
          />
          <Message
            v-if="$form.due_date?.invalid"
            severity="error"
            size="small"
            variant="simple"
          >
            {{ $form.due_date.error.message }}
          </Message>
        </div>

        <div class="flex flex-col gap-1">
          <label for="priority">Priority</label>
          <Select
            name="priority"
            v-model="task.priority"
            :options="priorityOptions"
            optionLabel="label"
            optionValue="value"
            placeholder="Select Priority"
          />
          <Message
            v-if="$form.priority?.invalid"
            severity="error"
            size="small"
            variant="simple"
          >
            {{ $form.priority.error.message }}
          </Message>
        </div>

        <Button
          label="Cancel"
          @click="emit('update:visible', false)"
          class="p-button-text"
        />
        <Button type="submit" label="Save" class="p-button-primary" />
      </Form>
    </template>
  </Dialog>
</template>
