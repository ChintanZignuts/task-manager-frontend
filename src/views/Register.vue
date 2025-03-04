<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Form } from "@primevue/forms";
import { yupResolver } from "@primevue/forms/resolvers/yup";
import * as yup from "yup";
import { InputText, Button, Card, Image, Message } from "primevue";
import logo from "../assets/logo.png";
import axiosIns from "@/services/axios.ts";
import { useToastMessage } from "@/composables/useToastMessage";

// Router instance
const router = useRouter();
const { showToast } = useToastMessage();

// Define form validation resolver
const resolver = ref(
  yupResolver(
    yup.object().shape({
      username: yup.string().required("Username is required."),
      email: yup
        .string()
        .email("Invalid email format")
        .required("Email is required."),
      password: yup
        .string()
        .min(6, "Password must be at least 6 characters.")
        .required("Password is required."),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords do not match.")
        .required("Confirm Password is required."),
    })
  )
);

// Register API call
const registerUser = async ({ valid, values }) => {
  try {
    if (!valid) {
      return;
    }
    const response = await axiosIns.post("/register/", {
      username: values.username,
      email: values.email,
      password: values.password,
      password2: values.confirmPassword,
    });
    if (response.status === 201) {
      showToast(
        "success",
        "Registration Successful",
        "You have successfully registered."
      );
      router.push("/login");
    }
  } catch (error: any) {
    console.error(
      error.response?.data?.detail || "Registration failed. Try again."
    );
  }
};
</script>

<template>
  <div class="flex items-center justify-center my-auto h-full w-full">
    <Toast />
    <Card class="w-full max-w-[25.35rem] mx-auto mt-10 p-5">
      <template #header>
        <div class="flex items-center justify-center pb-2">
          <Image :src="logo" alt="Logo" width="40" />
        </div>
        <div class="text-center text-2xl">Register</div>
      </template>
      <template #content>
        <Form
          v-slot="$form"
          :initialValues
          :resolver="resolver"
          @submit="registerUser"
          class="flex flex-col gap-4"
        >
          <!-- Username Field -->
          <div class="flex flex-col">
            <label for="username" class="pb-1">Username</label>
            <InputText id="username" name="username" />
            <Message
              v-if="$form.username?.invalid"
              severity="error"
              size="small"
              variant="simple"
            >
              {{ $form.username.error.message }}
            </Message>
          </div>

          <!-- Email Field -->
          <div class="flex flex-col">
            <label for="email" class="pb-1">Email</label>
            <InputText id="email" name="email" />
            <Message
              v-if="$form.email?.invalid"
              severity="error"
              size="small"
              variant="simple"
            >
              {{ $form.email.error.message }}
            </Message>
          </div>

          <!-- Password Field -->
          <div class="flex flex-col">
            <label for="password" class="pb-1">Password</label>
            <InputText id="password" name="password" type="password" />
            <Message
              v-if="$form.password?.invalid"
              severity="error"
              size="small"
              variant="simple"
            >
              {{ $form.password.error.message }}
            </Message>
          </div>

          <!-- Confirm Password Field -->
          <div class="flex flex-col">
            <label for="confirmPassword" class="pb-1">Confirm Password</label>
            <InputText
              id="confirmPassword"
              name="confirmPassword"
              type="password"
            />
            <Message
              v-if="$form.confirmPassword?.invalid"
              severity="error"
              size="small"
              variant="simple"
            >
              {{ $form.confirmPassword.error.message }}
            </Message>
          </div>

          <!-- Submit Button -->
          <Button
            type="submit"
            label="Register"
            icon="pi pi-user"
            class="w-full"
          />

          <!-- Login Redirect -->
          <div class="text-center text-sm mt-3">
            Already have an account?
            <RouterLink to="/login" class="text-blue-500 hover:underline"
              >Login</RouterLink
            >
          </div>
        </Form>
      </template>
    </Card>
  </div>
</template>
