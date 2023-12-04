<script setup>
import { getImageUrl, getStringFromArrayIngredients } from "@/common/helper";
import { useDataStore } from "@/stores";
import { computed } from "vue";

const dataStore = useDataStore();

const props = defineProps({
  order: {
    type: Object,
    required: true,
  },
});

const order = computed(() => {
  return {
    orderPizzas: (props.order.orderPizzas || []).map((item) => {
      return {
        size: dataStore.getItemById(item.sizeId, "sizes"),
        dough: dataStore.getItemById(item.doughId, "doughs"),
        sauce: dataStore.getItemById(item.sauceId, "sauces"),
        ingredients: (item.ingredients || []).map((item) => {
          return {
            ...dataStore.getItemById(item.ingredientId, "ingredients"),
          };
        }),
      };
    }),
    orderMisc: (props.order.orderMisc || []).map((item) => {
      return {
        ...dataStore.getItemById(item.miscId, "misc"),
        quantity: item.quantity,
      };
    }),
  };
});

console.log(order.value);
</script>

<template>
  <ul v-if="order.orderPizzas.length > 0" class="order__list">
    <li v-for="item in order.orderPizzas" :key="item.id" class="order__item">
      <div class="product">
        <img
          :src="getImageUrl('product.svg')"
          class="product__img"
          width="56"
          height="56"
          :alt="item.name"
        />
        <div class="product__text">
          <h2>{{ item.name }}</h2>
          <ul>
            <li>{{ item.size.name }}, на {{ item.dough.name }}</li>
            <li>Соус: {{ item.sauce.name }}</li>
            <li>
              Начинка: {{ getStringFromArrayIngredients(item.ingredients) }}
            </li>
          </ul>
        </div>
      </div>
    </li>
  </ul>

  <ul
    v-if="order.orderMisc && order.orderMisc.length > 0"
    class="order__additional"
  >
    <li v-for="item in order.orderMisc" :key="item.id">
      <img
        :src="getImageUrl(item.image + '.svg')"
        width="20"
        height="30"
        :alt="item.name"
      />
      <span>{{ item.name }}</span>
      <b
        >{{ item.count }} шт x {{ item.price }} ₽ =
        {{ item.price * item.quantity }} ₽</b
      >
    </li>
  </ul>
</template>

<style scoped lang="scss"></style>
