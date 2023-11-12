<script setup>
import IngredientLabel from "@/common/components/IngredientLabel.vue";


import { useDataStore } from "@/stores";

const dataStore = useDataStore();


const ingredients = dataStore.getIngredients;

</script>

<template>
  <IngredientLabel
    v-for="(ingredient, id) in ingredients"
    :key="id"
    :model-value="ingredient"
  />
</template>

<style scoped lang="scss"></style>
