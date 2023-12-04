<script setup>

import {computed} from "vue";
import {useProfileStore} from "@/stores";

const userStore = useProfileStore();

const user = computed(() => {
  return userStore.getProfile;
});


</script>

<template>
  <div class="user">
    <picture>
      <source type="image/webp" srcset="@/assets/img/users/user5@2x.webp 1x, @/assets/img/users/user5@4x.webp 2x">
      <img src="@/assets/img/users/user5.jpg"
           srcset="@/assets/img/users/user5@2x.jpg" :alt="user.name" width="72" height="72">
    </picture>
    <div class="user__name">
      <span>{{ user.name }}</span>
    </div>
    <p class="user__phone">
      Контактный телефон: <span>{{ user.phone }}</span>
    </p>
  </div>
</template>

<style scoped lang="scss">

</style>