import { defineStore } from "pinia";
import { useDataStore } from "./data";

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
      const dataStore = useDataStore();
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
    deleteOrder(id) {
      this.orders = this.orders.filter((order) => order.id !== id);
    },
    clearOrders() {
      this.orders = [];
    },
    addPizzaToOrder(orderId, pizza) {
      const order = this.orders.find((order) => order.id === orderId);
      pizza = order.orderPizzas.find(
        (orderPizza) => orderPizza.id === pizza.id
      );

      if (!pizza) {
        order.orderPizzas.push(pizza);
      } else {
        pizza.quantity += 1;
      }
    },
    deletePizzaFromOrder(orderId, pizzaId) {
      const order = this.orders.find((order) => order.id === orderId);
      order.orderPizzas = order.orderPizzas.filter(
        (pizza) => pizza.id !== pizzaId
      );
    },
    addMiscToOrder(orderId, misc) {
      const order = this.orders.find((order) => order.id === orderId);
      misc = order.orderMisc.find((orderMisc) => orderMisc.id === misc.id);

      if (!misc) {
        order.orderMisc.push(misc);
      } else {
        misc.quantity += 1;
      }
    },
    deleteMiscFromOrder(orderId, miscId) {
      const order = this.orders.find((order) => order.id === orderId);
      order.orderMisc = order.orderMisc.filter((misc) => misc.id !== miscId);
    },
    addAddressToOrder(orderId, address) {
      const order = this.orders.find((order) => order.id === orderId);
      order.orderAddress = address;
    },
    deleteAddressFromOrder(orderId) {
      const order = this.orders.find((order) => order.id === orderId);
      order.orderAddress = {};
    },
    addOnePizzaToOrder(orderId, pizzaId) {
      const order = this.orders.find((order) => order.id === orderId);
      const pizza = order.orderPizzas.find((pizza) => pizza.id === pizzaId);
      pizza.quantity += 1;
    }
  },
});
