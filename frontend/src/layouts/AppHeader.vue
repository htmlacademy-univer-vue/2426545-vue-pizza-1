<script>
import { computed, defineComponent } from "vue";
import { useProfileStore } from "@/stores";
import { useCartStore } from "@/stores";

const profileStore = useProfileStore();
const cartStore = useCartStore();

const cartPrice = computed(() => {
  return cartStore.getCartPrice;
});

const user = computed(() => {
  return profileStore.getProfile;
});

export default defineComponent({
  name: "AppHeader",
  setup() {
    return {
      user,
      cartPrice,
      profileStore
    }
  }
});
</script>

<template>
  <header class="header">
    <div class="header__logo">
      <router-link to="/" class="logo">
        <img
          src="../assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </router-link>
    </div>
    <div class="header__cart">
      <router-link to="/cart">{{ cartPrice }} ₽</router-link>
    </div>
    <div class="header__user">
      <router-link v-if="Object.keys(user).length === 0" to="/sign-in" class="header__login"
        ><span>Войти</span></router-link
      >
      <router-link
        v-if="Object.keys(user).length > 0"
        to="/user/profile"
        class="header__logout"
        ><span>{{ user.name }}</span></router-link
      >
    </div>
  </header>
</template>

<style scoped lang="scss"></style>
