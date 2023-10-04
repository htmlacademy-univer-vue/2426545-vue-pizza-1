<script setup>

import {ref} from "vue";

const props = defineProps({
  value: {
    type: Number,
    required: true,
  },
  max: {
    type: Number,
    default: 3,
  }
});
const emit = defineEmits(["update:value"]);
const count = ref(props.value);
const max = ref(props.max);

function increment() {
  if (count.value < max.value) {
    count.value++;
    emit("update:value", count.value);
  }
}

function decrement() {
  if (count.value > 0) {
    count.value--;
    emit("update:value", count.value);
  }
}
function updateFromInput(event) {
  const newCount = parseInt(event.target.value)
  if (newCount > max.value) {
    count.value = max.value;
  } else if (newCount < 0) {
    count.value = 0;
  } else {
    count.value = newCount;
  }
  emit("update:value", count.value);
}
</script>

<template>
  <div class="counter counter--orange ingredients__counter">
    <button
      type="button"
      class="counter__button counter__button--minus"
      :disabled="count === 0"
      @click="decrement"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      v-model="count"
      type="text"
      name="counter"
      class="counter__input"
      @change="updateFromInput"
    />
    <button
      type="button"
      class="counter__button counter__button--plus"
      :disabled="count === max"
      @click="increment"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<style scoped lang="scss"></style>
