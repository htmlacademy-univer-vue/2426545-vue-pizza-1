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

        <transition-group name="fade" tag="div" class="pizza__wrapper">
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
        </transition-group>

    </div>
  </div>
</template>

<style scoped lang="scss">


/* Анимация появления */
.fade-enter-active {
  animation: fadeIn 0.5s;
}

/* Анимация исчезновения */
.fade-leave-active {
  animation: fadeOut 0.5s;
}

/* CSS-правила для анимации */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
