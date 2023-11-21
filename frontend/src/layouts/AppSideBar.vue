<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppHeaderSideBar",
});
</script>

<template>
  <div class="layout__sidebar sidebar">
    <router-link to="/" class="logo layout__logo">
      <img
        src="../assets/img/logo.svg"
        alt="V!U!E! Pizza logo"
        width="90"
        height="40"
      />
    </router-link>

    <main class="layout">
    <router-link
      class="layout__link"
      :class="{ 'layout__link--active': $route.path === '/user/orders' }"
      to="/user/orders"
      >История заказов</router-link
    >

    <router-link
      class="layout__link"
      :class="{ 'layout__link--active': $route.path === '/user/profile' }"
      to="/user/profile"
      >Мои данные</router-link
    >
    </main>
  </div>
</template>

<style scoped lang="scss"></style>
