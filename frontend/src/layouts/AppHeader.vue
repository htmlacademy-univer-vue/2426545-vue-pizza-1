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
      <div v-else class="header__user">
        <router-link
            to="/user/profile"
        >
          <picture>
            <img
                src="@/assets/img/users/user5.jpg"
                srcset="@/assets/img/users/user5@2x.jpg"
                :alt="user.name"
                width="32"
                height="32"
            />
          </picture>
          <span>{{ user.name }}</span></router-link
        >
        <router-link to="/" class="header__logout" @click="profileStore.logout"
        ><span>Выйти</span></router-link
        >
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";

.header {
  position: relative;
  z-index: 2;

  display: flex;

  padding: 0 2.12%;

  background-color: $green-500;
  box-shadow: $shadow-light;
}

.header__logo {
  padding-top: 10px;
  padding-bottom: 10px;
}

.header__cart {
  margin-right: 10px;
  margin-left: auto;

  a {
    @include b-s16-h19;

    display: block;

    padding-top: 21px;
    padding-right: 15px;
    padding-bottom: 21px;
    padding-left: 58px;

    transition: 0.3s;

    color: $white;
    background-color: $green-500;
    background-image: url("@/assets/img/cart.svg");
    background-repeat: no-repeat;
    background-position: 20px center;
    background-size: 29px 27px;

    &:hover:not(:active) {
      background-color: $green-400;
    }

    &:active {
      background-color: $green-600;
    }

    &:focus {
      opacity: 0.5;
    }
  }
}

.header__user {
  display: flex;
  align-items: center;

  a {
    display: block;

    padding-top: 14px;
    padding-right: 20px;
    padding-bottom: 14px;
    padding-left: 20px;

    transition: 0.3s;

    background-color: $green-500;

    &:hover:not(:active) {
      background-color: $green-400;
    }

    &:active {
      background-color: $green-600;
    }

    &:focus {
      opacity: 0.5;
    }
  }

  img {
    display: inline-block;

    width: 32px;
    height: 32px;
    margin-right: 8px;

    vertical-align: middle;

    border-radius: 50%;
  }

  span {
    @include r-s14-h16;

    display: inline-block;

    vertical-align: middle;

    color: $white;
  }
}

.header__logout {
  &::before {
    display: inline-block;

    width: 32px;
    height: 32px;
    margin-right: 8px;

    content: "";
    vertical-align: middle;

    background: url("@/assets/img/login.svg") no-repeat center;
    background-size: auto 50%;
  }
}

.header__login {
  color: white;

  &::after {
    display: inline-block;

    width: 32px;
    height: 32px;
    margin-left: 8px;

    content: "";
    vertical-align: middle;

    background: url("@/assets/img/login.svg") no-repeat center;
    background-size: auto 50%;
  }
}
</style>
