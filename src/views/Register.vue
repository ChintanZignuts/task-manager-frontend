<script setup lang="ts">
import { InputText, Button, Card, Image } from "primevue";
import logo from "../assets/logo.png";
</script>

<template>
  <div class="h-full flex items-center justify-center">
    <Card class="w-full max-w-[25.35rem] mx-auto mt-10 p-5">
      <template #header>
        <div class="flex items-center justify-center pb-2">
          <Image :src="logo" alt="Image" width="40" class="" />
        </div>
        <div class="text-center text-2xl">Register</div>
      </template>
      <template #content>
        <div
          class="w-full flex flex-col items-center justify-center gap-3 py-5"
        >
          <div class="flex flex-col gap-2 w-full">
            <label for="username">Username</label>
            <InputText id="username" type="text" fluid />
          </div>
          <div class="flex flex-col gap-2 w-full">
            <label for="email">Email</label>
            <InputText id="email" type="text" fluid />
          </div>
          <div class="flex flex-col gap-2 w-full">
            <label for="password">Password</label>
            <InputText id="password" type="password" fluid />
          </div>
          <div class="flex flex-col gap-2 w-full">
            <label for="cpassword">Confirm Password</label>
            <InputText id="cpassword" type="password" fluid />
          </div>
          <div class="flex">
            <Button
              label="Register"
              icon="pi pi-user"
              class="w-full max-w-[17.35rem] mx-auto"
            ></Button>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>
