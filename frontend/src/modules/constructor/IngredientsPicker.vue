<script setup>
import IngredientLabel from "@/common/components/IngredientLabel.vue";


import { useDataStore } from "@/stores";

const dataStore = useDataStore();


const ingredients = dataStore.getIngredients;

</script>

<template>
  <ul class="ingredients__list">
  <IngredientLabel
    v-for="(ingredient, id) in ingredients"
    :key="id"
    :model-value="ingredient"
  />
  </ul>
</template>

<style scoped lang="scss"></style>
