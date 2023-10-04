<script setup>
import { computed, watch } from "vue";
import {
  getDoughSizeForConstructor,
  getIngredientAmountClass,
  getIngredientsNameFromImg
} from "@/mocks/helper";


const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
});

// Создаем вычисляемые свойства для отслеживания изменений
const selectedDough = computed(() =>
  getDoughSizeForConstructor(props.modelValue.dough)
);
const selectedSauce = computed(() => props.modelValue.sauce);

const ingredients = computed(() => props.modelValue.ingredients);

// Следим за изменениями modelValue и обновляем вычисляемые свойства
watch(
  () => props.modelValue,
  (newModelValue) => {
    selectedDough.value = getDoughSizeForConstructor(newModelValue.dough);
    selectedSauce.value = newModelValue.sauce;
    ingredients.value = newModelValue.ingredients;
  }
);
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
          v-for="item in ingredients"
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
