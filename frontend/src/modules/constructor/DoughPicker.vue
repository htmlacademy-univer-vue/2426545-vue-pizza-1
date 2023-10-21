<script setup>
import { getDoughType } from "@/mocks/helper";
import { computed, ref } from "vue";
const props = defineProps({
  doughs: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: String,
    required: true,
  }
});
const emit = defineEmits(["update:modelValue"]);

const selectedDough = ref(props.modelValue);
function selectDough(doughType) {
  selectedDough.value = doughType;
  emit("update:modelValue", doughType);
}
const isChecked = computed(() => {
  return (doughType) => doughType === selectedDough.value;
});
</script>

<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div
        v-for="dough in props.doughs"
        :key="dough.id"
        class="sheet__content dough"
      >
        <label
          :class="['dough__input--' + getDoughType(dough.name), 'dough__input']"
        >
          <input
            v-model="selectedDough"
            type="radio"
            name="dough"
            :checked="isChecked(getDoughType(dough.name))"
            :value="getDoughType(dough.name)"
            class=""
            @change="selectDough(getDoughType(dough.name))"
          />
          <b>{{ dough.name }}</b>
          <span>Из твердых сортов пшеницы</span>
        </label>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
