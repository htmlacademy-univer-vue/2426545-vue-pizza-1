<script setup>
import { getSauceName } from "@/mocks/helper";
import { computed, ref } from "vue";
const props = defineProps({
  sauces: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: String,
    required: true,
  },
});
const selectedSauce = ref(props.modelValue);
const emit = defineEmits(["update:modelValue"]);
function selectSauce(sauce) {
  selectedSauce.value = sauce;
  emit("update:modelValue", sauce);
}

const isChecked = computed(() => {
  return (sauceName) => sauceName === selectedSauce.value;
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
        :checked="isChecked(getSauceName(sauce.name))"
        type="radio"
        name="sauce"
        :value="getSauceName(sauce.name)"
        @change="selectSauce(getSauceName(sauce.name))"
      />
      <span>{{ sauce.name }}</span>
    </label>
  </div>
</template>

<style scoped lang="scss"></style>
