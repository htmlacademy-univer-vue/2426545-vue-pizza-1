<script setup>
import { getPizzaSize } from "@/mocks/helper";
import { computed, ref } from "vue";
import { useDataStore } from "@/stores";
import { usePizzaStore } from "@/stores";

const pizzaStore = usePizzaStore();
const dataStore = useDataStore();

const pizzaSizes = dataStore.getSizes;

const selectedSize = ref(pizzaStore.getPizzaSize);

function selectSize(size) {
  selectedSize.value = getPizzaSize(size.name);
  pizzaStore.setSizeToPizza(size);
}

const isChecked = computed(() => {
  return (size) => size === selectedSize.value.name;
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
            :checked="isChecked(size.name)"
            :value="getPizzaSize(size.name)"
            class=""
            @change="selectSize(size)"
          />
          <span>{{ size.name }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
