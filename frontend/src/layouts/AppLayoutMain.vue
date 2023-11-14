<script>
import { defineComponent } from "vue";
import AppHeader from "./AppHeader.vue";

export default defineComponent({
  name: "AppLayout",
  components: { AppHeader },
});
</script>

<template>
  <app-header></app-header>
</template>

<style scoped lang="scss"></style>
