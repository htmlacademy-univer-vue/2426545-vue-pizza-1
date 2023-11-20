<template>
  <app-layout>
    <router-view v-slot="{ Component, route }">
      <transition name="slide" mode="out-in">
        <div :key="route.name">
          <component :is="Component"></component>
        </div>
      </transition>
    </router-view>
  </app-layout>
</template>

<script setup>
import AppLayout from "./layouts/AppLayout.vue";
import { useDataStore} from "./stores";
import { useProfileStore } from "@/stores";
import { useCartStore } from "./stores";

const dataStore = useDataStore();

const userStore = useProfileStore();

const cartStore = useCartStore();


void userStore.fetchUser();
void userStore.fetchUserAddress();
void cartStore.fetchOrders();
void dataStore.fetchData();

</script>
<style lang="scss">
@import "@/assets/scss/app.scss";
body {
  justify-content: center;
}
.slide-enter-active {
  transition: all 0.4s
}
.slide-enter {
  opacity: 0;
  margin-left: 90px;
}
.slide-leave-active {
  transition: all 0.4s;
  opacity: 0;
  margin-left: -100px;
}
.main__wrapper {
  padding-bottom: 30px;

  background-color: $white;
  box-shadow: $shadow-light;

  h1 {
    margin-bottom: 0;
    padding: 0 95px;

    text-align: center;

    @include b-s36-h42;
  }

  p {
    padding: 0 95px;

    text-align: center;

    font-size: 20px;
    line-height: 30px;
  }

  b {
    font-size: 1.2em;
  }
}

.main__header {
  margin-bottom: 30px;
  padding: 20px 0;

  background-color: $green-600;

  img {
    display: block;

    margin: 0 auto;
  }
}
</style>
