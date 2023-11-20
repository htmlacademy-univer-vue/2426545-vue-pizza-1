<script>
import { defineComponent } from "vue";
import AppHeader from "./AppHeader.vue";

export default defineComponent({
  name: "AppLayout",
  components: { AppHeader },
});
</script>

<template>
  <div class="app_layout">
    <app-header></app-header>
    <slot />
  </div>
</template>

<style scoped lang="scss">
</style>
