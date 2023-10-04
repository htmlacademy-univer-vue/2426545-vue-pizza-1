<script setup>
import doughs from "../mocks/dough.json";
import sauces from "../mocks/sauces.json";
import pizzaSizes from "../mocks/sizes.json";
import ingredientsJson from "../mocks/ingredients.json";
import {
  getDoughType,
  getPizzaSize,
  getSauceName,
} from "@/mocks/helper";
import DoughPicker from "@/modules/constructor/DoughPicker.vue";
import SizePicker from "@/modules/constructor/SizePicker.vue";
import SaucePicker from "@/modules/constructor/SaucePicker.vue";
import { ref } from "vue";
import PizzaConstructor from "@/modules/constructor/PizzaConstructor.vue";
import IngredientsPicker from "@/modules/constructor/IngredientsPicker.vue";
import AppDrop from "@/common/components/AppDrop.vue";
import {MAX_INGREDIENTS} from "@/common/constants";

const pizza = ref({
  dough: getDoughType(doughs[0].name),
  size: getPizzaSize(pizzaSizes[0].name),
  ingredients: ingredientsJson.reduce(function (accumulator, current) {
    accumulator[current.id] = { ...current, count: 0 };
    return accumulator;
  }, {}),
  sauce: getSauceName(sauces[0].name),
});

function updatePizzaIngredients(ingredientData) {
  if (pizza.value.ingredients[ingredientData.id]) {
    pizza.value.ingredients[ingredientData.id].count = ingredientData.count;
  }
}

function onDrop(dataTransfer) {
  let ingredientData = JSON.parse(dataTransfer.payload)
  if (pizza.value.ingredients[ingredientData.id]) {
    if (pizza.value.ingredients[ingredientData.id].count !== MAX_INGREDIENTS) {
      pizza.value.ingredients[ingredientData.id].count += 1
    }
  }
}
</script>

<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <dough-picker v-model="pizza.dough" :doughs="doughs"></dough-picker>

        <size-picker
          v-model="pizza.size"
          :pizza-sizes="pizzaSizes"
        ></size-picker>

        <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">
              Выберите ингредиенты
            </h2>

            <div class="sheet__content ingredients">
              <sauce-picker
                v-model="pizza.sauce"
                :sauces="sauces"
              ></sauce-picker>

              <div class="ingredients__filling">
                <p>Начинка:</p>

                <ul class="ingredients__list">
                  <ingredients-picker
                    :ingredients="pizza.ingredients"
                    @updatePizzaIngredients="updatePizzaIngredients"
                  ></ingredients-picker>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="content__pizza">
          <label class="input">
            <span class="visually-hidden">Название пиццы</span>
            <input
              type="text"
              name="pizza_name"
              placeholder="Введите название пиццы"
            />
          </label>
          <app-drop @drop="onDrop" @dragover.prevent @dragenter.prevent>
            <pizza-constructor v-model="pizza"></pizza-constructor>
          </app-drop>

          <div class="content__result">
            <p>Итого: 0 ₽</p>
            <button type="button" class="button" disabled>Готовьте!</button>
          </div>
        </div>
      </div>
    </form>
  </main>
</template>

<style scoped lang="scss"></style>
