<script setup>
import { getDoughType } from "@/mocks/helper";
import { computed, ref } from "vue";
import { usePizzaStore } from "@/stores";
import { useDataStore } from "@/stores";

const dataStore = useDataStore();
const pizzaStore = usePizzaStore();
const doughs = computed(() => dataStore.getDoughs);

const selectedDough = ref(pizzaStore.getPizzaDough);
function selectDough(dough) {
  selectedDough.value = getDoughType(dough.name);
  pizzaStore.setDoughToPizza(dough);
}
const isChecked = computed(() => {
  return (doughType) => doughType === selectedDough.value.name;
});
</script>

<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div v-for="dough in doughs" :key="dough.id" class="sheet__content dough">
        <label
          :class="['dough__input--' + getDoughType(dough.name), 'dough__input']"
        >
          <input
            v-model="selectedDough"
            type="radio"
            name="dough"
            :checked="isChecked(dough.name)"
            :value="getDoughType(dough.name)"
            class=""
            @change="selectDough(dough)"
          />
          <b>{{ dough.name }}</b>
          <span>Из твердых сортов пшеницы</span>
        </label>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
