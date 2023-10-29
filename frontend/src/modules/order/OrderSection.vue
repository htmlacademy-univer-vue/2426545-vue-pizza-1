<script setup>
import OrderHeader from "@/modules/order/OrderHeader.vue";
import OrderList from "@/modules/order/OrderList.vue";
import {ref} from "vue";

const props = defineProps({
  modelValue: {
    type: Array,
    required: true,
  },
});

const orders = ref(props.modelValue);


</script>

<template>
  <section
    v-for="item in orders"
    :key="item.id"
    class="sheet order"
  >
    <order-header :order="item"></order-header>
    <order-list :order="item"></order-list>

    <p class="order__address">
      Адрес доставки: {{ item.address }}
    </p>
  </section>


</template>

<style scoped lang="scss"></style>
