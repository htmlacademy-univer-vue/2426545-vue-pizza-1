<script setup>

import {useCartStore} from "@/stores";


const cartStore = useCartStore();


const props = defineProps({
  order: {
    type: Object,
    required: true,
  },
});


function Reorder() {
  cartStore.Reorder(props.order);
}


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
        @click="cartStore.deleteOrder(props.order.id)"
      >
        Удалить
      </button>
    </div>
    <div class="order__button">
      <button
        type="button"
        class="button"
        @click="Reorder"
      >
        Повторить
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
