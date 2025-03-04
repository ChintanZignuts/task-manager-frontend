<script setup lang="ts">
import { Menubar, Badge, InputText, Avatar, Image } from "primevue";
import { ref } from "vue";
import logo from "../assets/logo.png";
const items = ref([
  {
    label: "Home",
    icon: "pi pi-home",
  },
  {
    label: "Tasks",
    icon: "pi pi-list-check",
  },
  {
    label: "About",
    icon: "pi pi-info-circle",
  },
]);
</script>
<template>
  <div class="container mx-auto mt-2">
    <Menubar :model="items">
      <template #start>
        <Image :src="logo" alt="Image" width="40" class="px-2" />
      </template>
      <template #end>
        <div>
          <Avatar
            image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
            shape="circle"
          />
        </div>
      </template>
    </Menubar>
  </div>
</template>
