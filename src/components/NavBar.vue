<script setup lang="ts">
import { Menubar, Avatar, Button, Image } from "primevue";
import { ref, watchEffect, computed } from "vue";
import { useRouter } from "vue-router";
import logo from "../assets/logo.png";

const router = useRouter();
const isAuthenticated = ref(!!localStorage.getItem("access_token")); // Make it reactive

const handleLogout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  isAuthenticated.value = false; // Update state
  router.push("/login");
};

// Define all menu items
const allItems = [
  {
    label: "Home",
    icon: "pi pi-home",
    command: () => {
      router.push("/");
    },
  },
  {
    label: "Tasks",
    icon: "pi pi-list-check",
    requiresAuth: true, // Mark as requiring authentication
    command: () => {
      router.push("/tasks");
    },
  },
  {
    label: "About",
    icon: "pi pi-info-circle",
    command: () => {
      router.push("/about");
    },
  },
];

// Computed property to filter menu items based on authentication state
const filteredItems = computed(() =>
  allItems.filter((item) => !item.requiresAuth || isAuthenticated.value)
);
// Watch for changes in localStorage (useful if another tab updates it)
watchEffect(() => {
  isAuthenticated.value = !!localStorage.getItem("access_token");
});
</script>

<template>
  <div class="container mx-auto mt-2">
    <Menubar :model="filteredItems">
      <template #start>
        <Image :src="logo" alt="Logo" width="40" class="px-2" />
      </template>
      <template #end>
        <div class="flex items-center gap-3">
          <template v-if="isAuthenticated">
            <Avatar
              image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
              shape="circle"
            />
            <Button label="Logout" severity="danger" @click="handleLogout" />
          </template>
          <template v-else>
            <Button
              label="Login"
              severity="secondary"
              @click="router.push('/login')"
            />
            <Button
              label="Register"
              severity="primary"
              @click="router.push('/register')"
            />
          </template>
        </div>
      </template>
    </Menubar>
  </div>
</template>
