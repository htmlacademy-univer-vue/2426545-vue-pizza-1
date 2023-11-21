<script setup>
import { getIngredientsNameFromImg } from "@/mocks/helper";
import { computed } from "vue";
import CounterInput from "@/common/components/AppCounter.vue";
import AppDrag from "@/common/components/AppDrag.vue";
import { MAX_INGREDIENTS } from "@/common/constants";
import { useDataStore } from "@/stores";
import { usePizzaStore } from "@/stores";

const dataStore = useDataStore();
const pizzaStore = usePizzaStore();

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
});
const ingredient = dataStore.getItemById(props.modelValue.id, "ingredients");

const count = computed(() => pizzaStore.getIngredientPizzaCount(ingredient.id));

function changeCount(newCount) {
  if (newCount < 0 || newCount === 0) {
    pizzaStore.deleteIngredientPizza(ingredient.id);
  } else if (newCount > 3) {
    pizzaStore.updateIngredientPizza(ingredient, 3);
  } else {
    ingredient.count = newCount;
    pizzaStore.updateIngredientPizza(ingredient, newCount);
  }
}

const dataJson = { payload: JSON.stringify(ingredient) };
</script>

<template>
  <li class="ingredients__item">
    <app-drag
      :draggable="count < MAX_INGREDIENTS"
      :transfer-data="dataJson"
    >
      <span
        :class="[
          'filling',
          'filling--' + getIngredientsNameFromImg(ingredient.image),
        ]"
      >
        {{ ingredient.name }}
      </span>
    </app-drag>
    <counter-input :value="count" @update:value="changeCount" />
  </li>
</template>

<style scoped lang="scss"></style>
