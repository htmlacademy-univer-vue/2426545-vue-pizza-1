<script setup>
import { getPizzaSize } from "@/mocks/helper";
import { computed, ref } from "vue";
const props = defineProps({
  pizzaSizes: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);
const selectedSize = ref(props.modelValue);

function selectSize(size) {
  selectedSize.value = size;
  emit("update:modelValue", size);
}

const isChecked = computed(() => {
  return (size) => size === selectedSize.value;
});
</script>

<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <label
          v-for="size in pizzaSizes"
          :key="size.id"
          :class="[
            'diameter__input',
            'diameter__input--' + getPizzaSize(size.name),
          ]"
        >
          <input
            v-model="selectedSize"
            type="radio"
            name="diameter"
            :checked="isChecked(getPizzaSize(size.name))"
            :value="getPizzaSize(size.name)"
            class=""
            @change="selectSize(getPizzaSize(size.name))"
          />
          <span>{{ size.name }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
