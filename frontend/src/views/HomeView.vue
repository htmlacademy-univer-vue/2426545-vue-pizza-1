<script setup>
import { usePizzaStore } from "@/stores";
import DoughPicker from "@/modules/constructor/DoughPicker.vue";
import SizePicker from "@/modules/constructor/SizePicker.vue";
import SaucePicker from "@/modules/constructor/SaucePicker.vue";
import { computed } from "vue";
import PizzaConstructor from "@/modules/constructor/PizzaConstructor.vue";
import IngredientsPicker from "@/modules/constructor/IngredientsPicker.vue";
import AppDrop from "@/common/components/AppDrop.vue";
import { MAX_INGREDIENTS } from "@/common/constants";
import { useCartStore } from "@/stores";
import { useRouter } from "vue-router";

const router = useRouter();

const cartStore = useCartStore();
const pizzaStore = usePizzaStore();

const pizza = computed(() => pizzaStore.getPizza);

function onDrop(dataTransfer) {
  let ingredientData = JSON.parse(dataTransfer.payload);
  const count = pizzaStore.getIngredientPizzaCount(ingredientData.id);
  if (count < MAX_INGREDIENTS) {
    pizzaStore.updateIngredientPizza(ingredientData, count + 1);
  }
}


function addPizzaToCart() {
  cartStore.addPizzaFromConstructorToCart(pizza.value);
  pizzaStore.clearConstructorPizza();
  router.push("/cart");
}
</script>

<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <dough-picker></dough-picker>

        <size-picker></size-picker>

        <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">
              Выберите ингредиенты
            </h2>

            <div class="sheet__content ingredients">
              <sauce-picker></sauce-picker>

              <div class="ingredients__filling">
                <p>Начинка:</p>


                  <ingredients-picker></ingredients-picker>

              </div>
            </div>
          </div>
        </div>

        <div class="content__pizza">
          <label class="input">
            <span class="visually-hidden">Название пиццы</span>
            <input
              v-model="pizza.name"
              type="text"
              name="pizza_name"
              placeholder="Введите название пиццы"
            />
          </label>
          <app-drop @drop="onDrop" @dragover.prevent @dragenter.prevent>
            <pizza-constructor></pizza-constructor>
          </app-drop>

          <div class="content__result">
            <p>Итого: {{ cartStore.getPizzaPrice(pizza) }} ₽</p>
            <button
              type="button"
              class="button"
              :disabled="pizza.name === '' || pizza.ingredients.length === 0"
              @click="addPizzaToCart"
            >
              Готовьте!
            </button>
          </div>
        </div>
      </div>
    </form>
  </main>
</template>

<style scoped lang="scss"></style>
