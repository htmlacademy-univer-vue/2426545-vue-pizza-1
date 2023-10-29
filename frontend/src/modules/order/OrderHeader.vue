<script setup>
const props = defineProps({
  order: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="order__wrapper">
    <div class="order__number">
      <b>Заказ #{{ props.order.orderNumber }}</b>
    </div>

    <div class="order__sum">
      <span>Сумма заказа: {{ props.order.sum }}₽</span>
    </div>

    <div class="order__button">
      <button
        type="button"
        class="button button--border"
        @click="emit('delete:modelValue', props.order)"
      >
        Удалить
      </button>
    </div>
    <div class="order__button">
      <button
        type="button"
        class="button"
        @click="emit('repeat:modelValue', props.order)"
      >
        Повторить
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
