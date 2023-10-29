<script setup>
import { getIngredientsNameFromImg } from "@/mocks/helper";
import { ref } from "vue";
import CounterInput from "@/common/components/AppCounter.vue";
import AppDrag from "@/common/components/AppDrag.vue";
import { MAX_INGREDIENTS } from "@/common/constants";

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
});

const ingredient = ref(props.modelValue);

const emit = defineEmits(["updateIngredients"]);

function changeCount(newCount) {
  if (newCount < 0) {
    ingredient.value.count = 0;
  } else if (newCount > 3) {
    ingredient.value.count = 3;
  } else {
    ingredient.value.count = newCount;
  }
  emit("updateIngredients", {
    ...props.modelValue,
    count: ingredient.value.count,
  });
}

const dataJson = { payload: JSON.stringify(props.modelValue) };
</script>

<template>
  <li class="ingredients__item">
    <app-drag
      :draggable="ingredient.count < MAX_INGREDIENTS"
      :transfer-data="dataJson"
    >
      <span
        :class="[
          'filling',
          'filling--' + getIngredientsNameFromImg(props.modelValue.image),
        ]"
      >
        {{ props.modelValue.name }}
      </span>
    </app-drag>
    <counter-input :value="ingredient.count" @update:value="changeCount" />
  </li>
</template>

<style scoped lang="scss"></style>
