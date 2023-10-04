<script setup>
import { getIngredientsNameFromImg } from "@/mocks/helper";
import { ref } from "vue";
import CounterInput from "@/common/components/CounterInput.vue";
import AppDrag from "@/common/components/AppDrag.vue";

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
});

const count = ref(0);

const emit = defineEmits(["updateIngredients"]);

function changeCount(newCount) {
  if (newCount < 0) {
    count.value = 0;
  } else if (newCount > 3) {
    count.value = 3;
  } else {
    count.value = newCount;
  }
  emit("updateIngredients", {
    ingredient: props.modelValue,
    count: count.value,
  });
}

const dataJson = { payload: JSON.stringify(props.modelValue) };
</script>

<template>
  <li class="ingredients__item">
    <app-drag :transfer-data="dataJson">
      <span
        :class="[
          'filling',
          'filling--' + getIngredientsNameFromImg(props.modelValue.image),
        ]"
        >{{ props.modelValue.name }}</span
      >
    </app-drag>
    <counter-input :value="count" @update:value="changeCount" />
  </li>
</template>

<style scoped lang="scss"></style>
