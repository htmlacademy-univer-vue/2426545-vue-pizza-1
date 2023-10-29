<script>
import { defineComponent } from "vue";
import AppHeader from "./AppHeader.vue";
import AppSideBar from "@/layouts/AppSideBar.vue";

export default defineComponent({
  name: "AppLayoutUser",
  components: { AppSideBar, AppHeader },
});
</script>

<template>
  <div class="app_layout">
    <app-header></app-header>
    <app-side-bar></app-side-bar>
    <slot />
  </div>
</template>

<style scoped lang="scss"></style>
