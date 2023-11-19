<template>
  <div class="sign-form">
    <a href="/" class="close close--white">
      <span class="visually-hidden">Закрыть форму авторизации</span>
    </a>
    <div class="sign-form__title">
      <h1 class="title title--small">Авторизуйтесь на сайте</h1>
    </div>
    <form @submit.prevent="login">
      <div class="sign-form__input">
        <label class="input">
          <span>E-mail</span>
          <input
            v-model="email"
            type="email"
            name="email"
            placeholder="example@mail.ru"
          />
        </label>
        <p v-if="!isEmailValid" class="error-message">Некорректный e-mail</p>
      </div>

      <div class="sign-form__input">
        <label class="input">
          <span>Пароль</span>
          <input
            v-model="password"
            type="password"
            name="pass"
            placeholder="***********"
          />
        </label>
        <p v-if="!isPasswordValid" class="error-message">Некорректный пароль</p>
      </div>
      <button type="submit" class="button">Авторизоваться</button>
    </form>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useAuthStore } from "@/stores";
import router from "@/router";
import { useProfileStore } from "@/stores";

const profileStore = useProfileStore();
const email = ref("");
const password = ref("");
const isEmailValid = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.value);
});

const isPasswordValid = computed(() => {
  const passwordCheck = password.value;
  return passwordCheck.length >= 3 && !passwordCheck.includes(" ");
});

const login = () => {
  if (isEmailValid.value && isPasswordValid.value) {
    try {
      const authStore = useAuthStore();
      authStore.login(email.value, password.value).then((resp) => {
        if (resp === "ok") {
          profileStore.fetchUser();
          router.push("/");
        } else {
          alert(resp);
        }
      });
    } catch (e) {
      console.log(e);
    }
  } else {
    alert("Некорректные данные");
  }
};
</script>

<style scoped lang="scss"></style>
