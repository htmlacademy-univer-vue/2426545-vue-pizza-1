<script setup>
import IngredientLabel from "@/common/components/IngredientLabel.vue";

const props = defineProps({
  ingredients: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["updatePizzaIngredients"]);
function changeIngredient(ingredientData) {
  emit("updatePizzaIngredients", ingredientData);
}
</script>

<template>
  <IngredientLabel
    v-for="ingredient in props.ingredients"
    :key="ingredient.id"
    :model-value="ingredient"
    @updateIngredients="changeIngredient"
  />
</template>

<style scoped lang="scss"></style>
