<script setup>
import OrderSection from "@/modules/order/OrderSection.vue";
import { computed } from "vue";
import { useCartStore } from "@/stores";

const cartStore = useCartStore();

const orders = computed(() => {
  return cartStore.getOrders;
});
</script>

<template>
  <div class="layout__content">
    <div class="layout__title">
      <h1 class="title title--big">История заказов</h1>
    </div>
    <order-section v-if="orders.length > 0" v-model="orders"></order-section>
    <div v-else class="orders__empty">
      <p>Заказов пока нет</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.layout__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 0;
}
</style>
