<script setup>
import { computed } from "vue";
import {
  getDoughSizeForConstructor,
  getIngredientAmountClass,
  getIngredientsNameFromImg, getSauceName
} from "@/mocks/helper";
import { usePizzaStore} from "@/stores";
const pizzaStore = usePizzaStore();

const pizza = computed(() => pizzaStore.getPizza);

// Создаем вычисляемые свойства для отслеживания изменений
const selectedDough = computed( () => {
  return getDoughSizeForConstructor(pizza.value.dough.name);
});

const selectedSauce = computed( () => {
  return getSauceName(pizza.value.sauce.name);
});

</script>

<template>
  <div class="content__constructor">
    <div
      :class="[
        'pizza',
        'pizza--foundation--' + selectedDough + '-' + selectedSauce,
      ]"
    >
      <div class="pizza__wrapper">
        <div
          v-for="item in pizza.ingredients"
          v-show="item.count > 0"
          :key="item.id"
          :class="[
            'pizza__filling',
            'pizza__filling--' + getIngredientsNameFromImg(item.image),
            getIngredientAmountClass(item.count),
          ]"
        ></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
