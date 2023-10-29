<script setup>
import { ref, watch } from "vue";
import { MAX_INGREDIENTS } from "@/common/constants";

const props = defineProps({
  value: {
    type: Number,
    required: true,
  },
  btnColorStyle: {
    type: String,
    default: "",
  },
});
const emit = defineEmits(["update:value"]);
const count = ref(props.value);

watch(
  () => props.value,
  (newValue) => {
    count.value = newValue;
  }
);

function increment() {
  if (count.value < MAX_INGREDIENTS) {
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
  const newCount = parseInt(event.target.value);
  if (newCount > MAX_INGREDIENTS) {
    count.value = MAX_INGREDIENTS;
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
      :class="[
        'counter__button',
        'counter__button--minus',
      ]"
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
      :class="[
        'counter__button',
        'counter__button--plus',
        btnColorStyle === 'constructor' ? 'counter__button--orange' : '',
      ]"
      :disabled="count === MAX_INGREDIENTS"
      @click="increment"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<style scoped lang="scss"></style>
