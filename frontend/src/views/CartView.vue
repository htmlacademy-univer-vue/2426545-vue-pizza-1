<script setup>
import { getImageUrl } from "@/common/helper";

import { useCartStore } from "@/stores";
import { computed, ref } from "vue";
import { useProfileStore } from "@/stores";
import { useDataStore } from "@/stores";
import { getIngredientNamesFromArray } from "@/mocks/helper";
import router from "@/router";

const dataStore = useDataStore();
const cartStore = useCartStore();
const profileStore = useProfileStore();


const cart = computed(() => {
  return cartStore.getCart;
});

const addresses = computed(() => {
  return profileStore.getAddresses;
});

const miscData = computed(() => {
  return dataStore.getMisc;
});

const selectedAddressOption = ref("0");

const addressNew = ref({
  type: 0,
  phone: "",
  street: "",
  building: "",
  flat: "",
});

function MorePizza(index) {
  cartStore.MorePizzaToCart(index);
}

function MoreMisc(id) {
  cartStore.MoreMiscToCart(id);
}

function ReduceMisc(index) {
  cartStore.ReduceMiscToCart(index);
}

function ReducePizza(index) {
  cartStore.ReducePizzaToCart(index);
}

function getMiscCountFromUserCart(id) {
  const miscCart = cart.value.CartMisc.find((misc) => misc.id === id);
  if (miscCart) {
    return miscCart.count;
  } else {
    return 0;
  }
}

function SendOrder() {
  if (selectedAddressOption.value === "0") {
    alert("Выберите адрес доставки");
    return;
  }
  if (cart.value.CartPizzas.length === 0 && cart.value.CartMisc.length === 0) {
    alert("В корзине нет ни одного товара");
    return;
  }

  switch (selectedAddressOption.value) {
    case "in_store":
      cartStore.sendOrderNoAddress();
      break;
    case "new":
      cartStore.sendOrder(addressNew.value, addressNew.value.phone);
      break;
    default:
      cartStore.sendOrder(
        addresses.value.find(
          (address) => address.id === selectedAddressOption.value
        ),
        addressNew.value.phone
      );
  }
  router.push("/");
}
</script>

<template>
  <main class="content cart">
    <div class="container">
      <div class="cart__title">
        <h1 class="title title--big">Корзина</h1>
      </div>

      <div
        v-if="cart.CartPizzas.length === 0 && cart.CartMisc.length === 0"
        class="sheet cart__empty"
      >
        <p>В корзине нет ни одного товара</p>
      </div>

      <ul v-else class="cart-list sheet">
        <li
          v-for="(pizza, index) in cart.CartPizzas"
          :key="index"
          class="cart-list__item"
        >
          <div class="product cart-list__product">
            <img
              :src="getImageUrl(pizza.image)"
              class="product__img"
              width="56"
              height="56"
              :alt="pizza.name"
            />
            <div class="product__text">
              <h2>{{ pizza.name }}</h2>
              <ul>
                <li>{{ pizza.size.name }}, на {{ pizza.dough.name }}, тесте</li>
                <li>Соус: {{ pizza.sauce.name }}</li>
                <li>
                  Начинка: {{ getIngredientNamesFromArray(pizza.ingredients) }}
                </li>
              </ul>
            </div>
          </div>

          <div class="counter cart-list__counter">
            <button
              type="button"
              class="counter__button counter__button--minus"
              @click="ReducePizza(index)"
            >
              <span class="visually-hidden">Меньше</span>
            </button>
            <input
              type="text"
              name="counter"
              class="counter__input"
              :value="pizza.count"
            />
            <button
              type="button"
              class="counter__button counter__button--plus counter__button--orange"
              @click="MorePizza(index)"
            >
              <span class="visually-hidden">Больше</span>
            </button>
          </div>

          <div class="cart-list__price">
            <b>{{ cartStore.getPizzaPrice(pizza) * pizza.count }} ₽</b>
          </div>

          <div class="cart-list__button">
            <button type="button" class="cart-list__edit">Изменить</button>
          </div>
        </li>
      </ul>

      <div class="cart__additional">
        <ul class="additional-list">
          <li
            v-for="misc in miscData"
            :key="misc.id"
            class="additional-list__item sheet"
          >
            <p class="additional-list__description">
              <img
                :src="getImageUrl(misc.image)"
                width="39"
                height="60"
                :alt="misc.name"
              />
              <span>{{ misc.name }}</span>
            </p>

            <div class="additional-list__wrapper">
              <div class="counter additional-list__counter">
                <button
                  type="button"
                  class="counter__button counter__button--minus"
                  @click="ReduceMisc(misc.id)"
                >
                  <span class="visually-hidden">Меньше</span>
                </button>
                <input
                  type="text"
                  name="counter"
                  class="counter__input"
                  :value="getMiscCountFromUserCart(misc.id)"
                />
                <button
                  type="button"
                  class="counter__button counter__button--plus counter__button--orange"
                  @click="MoreMisc(misc.id)"
                >
                  <span class="visually-hidden">Больше</span>
                </button>
              </div>

              <div class="additional-list__price">
                <b>× {{ misc.price * getMiscCountFromUserCart(misc.id) }} ₽</b>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div
        v-if="cart.CartMisc.length > 0 || cart.CartPizzas.length > 0"
        class="cart__form"
      >
        <div class="cart-form">
          <label class="cart-form__select">
            <span class="cart-form__label">Получение заказа:</span>

            <select v-model="selectedAddressOption" name="test" class="select">
              <option value="in_store">Заберу сам</option>
              <option value="new">Новый адрес</option>
              <option
                v-for="address in addresses"
                :key="address.id"
                :value="address.id"
              >
                {{ address.name }}
              </option>
            </select>
          </label>

          <label class="input input--big-label">
            <span>Контактный телефон:</span>
            <input
              v-model="addressNew.phone"
              type="text"
              name="tel"
              placeholder="+7 (___) ___-__-__"
            />
          </label>

          <div
            v-if="selectedAddressOption === 'new'"
            class="cart-form__address"
          >
            <span class="cart-form__label">Новый адрес:</span>

            <div class="cart-form__input">
              <label class="input">
                <span>Улица*</span>
                <input v-model="addressNew.street" type="text" name="street" />
              </label>
            </div>

            <div class="cart-form__input cart-form__input--small">
              <label class="input">
                <span>Дом*</span>
                <input v-model="addressNew.building" type="text" name="house" />
              </label>
            </div>

            <div class="cart-form__input cart-form__input--small">
              <label class="input">
                <span>Квартира</span>
                <input v-model="addressNew.flat" type="text" name="apartment" />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  <section
    v-if="cart.CartMisc.length > 0 || cart.CartPizzas.length > 0"
    class="footer"
  >
    <div class="footer__more">
      <router-link class="button button--border button--arrow" to="/"
        >Хочу еще одну</router-link
      >
    </div>
    <p class="footer__text">
      Перейти к конструктору<br />чтоб собрать ещё одну пиццу
    </p>
    <div class="footer__price">
      <b>Итого: {{ cartStore.getCartPrice }} ₽</b>
    </div>

    <div class="footer__submit">
      <button type="button" class="button" @click="SendOrder">
        Оформить заказ
      </button>
    </div>
  </section>
</template>

<style scoped lang="scss"></style>
