<script setup>
import { getSauceName } from "@/mocks/helper";
import { computed, ref } from "vue";
import { useDataStore } from "@/stores";
import { usePizzaStore } from "@/stores";

const pizzaStore = usePizzaStore();
const dataStore = useDataStore();

const selectedSauce = ref(pizzaStore.getPizzaSauce);
const sauces = dataStore.getSauces;


function selectSauce(sauce) {
  selectedSauce.value = getSauceName(sauce.name);
  pizzaStore.setSauceToPizza(sauce);
}

const isChecked = computed(() => {
  return (sauceName) => sauceName === selectedSauce.value.name;
});
</script>

<template>
  <div class="ingredients__sauce">
    <p>Основной соус:</p>

    <label
      v-for="sauce in sauces"
      :key="sauce.id"
      class="radio ingredients__input"
    >
      <input
        v-model="selectedSauce"
        :checked="isChecked(sauce.name)"
        type="radio"
        name="sauce"
        :value="getSauceName(sauce.name)"
        @change="selectSauce(sauce)"
      />
      <span>{{ sauce.name }}</span>
    </label>
  </div>
</template>

<style scoped lang="scss"></style>
