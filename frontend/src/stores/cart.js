import { defineStore } from "pinia";
import { useDataStore } from "./data";

const dataStore = useDataStore();
export const useCartStore = defineStore("cart", {
  state: () => ({
    orders: [
      {
        id: 0,
        userId: "string",
        addressId: 0,
        orderPizzas: [
          {
            id: 0,
            name: "string",
            sauceId: 0,
            doughId: 0,
            sizeId: 0,
            quantity: 0,
            orderId: 0,
            ingredients: [
              {
                id: 0,
                pizzaId: 0,
                ingredientId: 0,
                quantity: 0,
              },
            ],
          },
        ],
        orderMisc: [
          {
            id: 0,
            orderId: 0,
            miscId: 0,
            quantity: 0,
          },
        ],
        orderAddress: {
          id: 0,
          name: "string",
          street: "string",
          building: "string",
          flat: "string",
          comment: "string",
          userId: "string",
        },
      },
    ],
  }),
  getters: {
    getOrders: (state) => state.orders,
    getOrderById: (state) => (id) =>
      state.orders.find((order) => order.id === id),
    getOrderPrice: (state) => (id) => {
      const order = state.orders.find((order) => order.id === id);
      let price = 0;
      for (const pizza of order.orderPizzas) {
        const sauce = dataStore.getItemById(pizza.sauceId, "sauces");
        const dough = dataStore.getItemById(pizza.doughId, "dough");
        const size = dataStore.getItemById(pizza.sizeId, "sizes");
        const ingredients = pizza.ingredients;

        for (const ingredient of ingredients) {
          const item = dataStore.getItemById(
            ingredient.ingredientId,
            "ingredients"
          );
          price += item.price * ingredient.quantity;
        }

        price += sauce.price;
        price += dough.price;
        price = price * size.multiplier;
      }
      return price;
    },
  },
  actions: {
    addOrder(order) {
      // TODO add validation
      this.orders.push(order);
    },
  },
});
