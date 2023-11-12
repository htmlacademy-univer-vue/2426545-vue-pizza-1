<script setup>

import User from "@/modules/profile/UserProfile.vue";
import UserAdress from "@/modules/profile/UserAdress.vue";
import AdressAdd from "@/modules/profile/AdressAdd.vue";
import {ref} from "vue";

let showAddress = ref(false);
</script>

<template>
  <main class="layout">
    <div class="layout__content">
      <div class="layout__title">
        <h1 class="title title--big">Мои данные</h1>
      </div>

      <user></user>

      <user-adress></user-adress>

      <adress-add v-if="showAddress" @delete="showAddress = false"></adress-add>


      <div v-if="!showAddress" class="layout__button">
        <button type="button" class="button button--border" @click="showAddress = true">Добавить новый адрес</button>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">

</style>