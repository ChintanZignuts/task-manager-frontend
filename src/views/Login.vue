<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { InputText, Button, Card, Image, Message } from "primevue";
import { Form } from "@primevue/forms";
import { yupResolver } from "@primevue/forms/resolvers/yup";
import * as yup from "yup";
import axiosIns from "@/services/axios.ts";
import logo from "../assets/logo.png";
import { useToastMessage } from "@/composables/useToastMessage";

// Router instance
const router = useRouter();
const { showToast } = useToastMessage();
// Validation schema using Yup
const resolver = ref(
  yupResolver(
    yup.object().shape({
      username: yup.string().required("Username is required."),
      password: yup.string().required("Password is required."),
    })
  )
);

// Form submit handler
const onFormSubmit = async ({ valid, values }) => {
  try {
    if (!valid) {
      return;
    }
    const response = await axiosIns.post("http://localhost:8000/api/login/", {
      username: values.username,
      password: values.password,
    });
    const { access, refresh } = response.data;
    showToast(
      "success",
      "Login Successful",
      "You have successfully logged in."
    );
    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);

    window.location.href = "/tasks";
  } catch (error) {
    showToast("error", "Login Failed", "Invalid username or password.");
  }
};
</script>

<template>
  <div class="flex items-center justify-center my-auto h-full w-full">
    <Card class="w-full max-w-[25.35rem] mx-auto mt-10 p-5">
      <template #header>
        <div class="flex items-center justify-center pb-2">
          <Image :src="logo" alt="Logo" width="40" />
        </div>
        <div class="text-center text-2xl">Login</div>
      </template>
      <template #content>
        <Form
          v-slot="$form"
          :resolver="resolver"
          @submit="onFormSubmit"
          class="w-full flex flex-col gap-4"
        >
          <!-- Username Field -->
          <div class="flex flex-col gap-1">
            <label for="username">Username</label>
            <InputText name="username" type="text" fluid />
            <Message
              v-if="$form.username?.invalid"
              severity="error"
              size="small"
              variant="simple"
            >
              {{ $form.username.error.message }}
            </Message>
          </div>

          <!-- Password Field -->
          <div class="flex flex-col gap-1">
            <label for="password">Password</label>
            <InputText name="password" type="password" fluid />
            <Message
              v-if="$form.password?.invalid"
              severity="error"
              size="small"
              variant="simple"
            >
              {{ $form.password.error.message }}
            </Message>
          </div>

          <!-- Submit Button -->
          <div class="flex">
            <Button
              type="submit"
              label="Login"
              icon="pi pi-user"
              class="w-full max-w-[17.35rem] mx-auto"
            ></Button>
          </div>

          <!-- Register Link -->
          <div class="text-center text-sm mt-3">
            Don't have an account?
            <RouterLink to="/register" class="text-blue-500 hover:underline"
              >Register</RouterLink
            >
          </div>
        </Form>
      </template>
    </Card>
  </div>
</template>
