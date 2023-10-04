<script setup>
import IngredientLabel from "@/common/components/IngredientLabel.vue";
import {ref} from "vue";

const props = defineProps({
  ingredients: {
    type: Object,
    required: true,
  },
});

const ingredients = ref(props.ingredients)

const emit = defineEmits(["updatePizzaIngredients"]);
function changeIngredient(ingredientData) {
  emit("updatePizzaIngredients", ingredientData);
}
</script>

<template>
  <IngredientLabel
    v-for="(ingredient,id) in ingredients"
    :key="id"
    :model-value="ingredient"
    @updateIngredients="changeIngredient"
  />
</template>

<style scoped lang="scss"></style>
