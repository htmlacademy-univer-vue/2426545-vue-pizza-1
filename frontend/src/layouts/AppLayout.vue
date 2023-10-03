<script>
import { defineComponent } from "vue";
import AppHeader from "./AppHeader.vue";
import HomeView from "../views/HomeView.vue";

export default defineComponent({
  name: "AppLayout",
  components: {HomeView, AppHeader },
});
</script>

<template>
  <app-header></app-header>
  <home-view></home-view>
</template>

<style scoped lang="scss"></style>
