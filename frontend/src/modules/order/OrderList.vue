<script setup>
import {getImageUrl} from "@/common/helper";

const props = defineProps({
  order: {
    type: Object,
    required: true,
  },
});

</script>

<template>
  <ul v-if="props.order.ordersPizzas.length > 0" class="order__list">
    <li
      v-for="item in props.order.ordersPizzas"
      :key="item.id"
      class="order__item"
    >
      <div class="product">
        <img
            :src="getImageUrl(item.image)"
          class="product__img"
          width="56"
          height="56"
          :alt="item.name"
        />
        <div class="product__text">
          <h2>{{ item.name }}</h2>
          <ul>
            <li>{{ item.size }}, на {{ item.dough }}</li>
            <li>Соус: {{ item.sauce }}</li>
            <li>Начинка: {{ item.ingredients }}</li>
          </ul>
        </div>
      </div>
    </li>
  </ul>

  <ul v-if="props.order.additional.length > 0" class="order__additional">
    <li v-for="item in props.order.additional" :key="item.id">
      <img :src="getImageUrl(item.image)" width="20" height="30" :alt="item.name" />
      <span>{{ item.name }}</span>
      <b
        >{{ item.count }} шт x {{ item.price }} ₽ =
        {{ item.price * item.count }} ₽</b
      >
    </li>
  </ul>
</template>

<style scoped lang="scss"></style>
