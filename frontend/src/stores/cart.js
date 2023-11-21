import { defineStore } from "pinia";
import { useDataStore } from "./data";
import ordersMock from "../mocks/orders.json";
export const useCartStore = defineStore("cart", {
  state: () => ({
    orders: [],
    cart: {
      CartPizzas: [],
      CartMisc: [],
    },
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
          price += item.price * ingredient.count;
        }

        for (const misc of order.additional) {
          price += misc.price * misc.count;
        }

        price += sauce.price;
        price += dough.price;
        price = price * size.multiplier;
      }
      return price;
    },
    getPizzaPrice: () => (pizza) => {
      let price = 0;
      const ingredients = pizza.ingredients;

      for (const ingredient of ingredients) {
        const item = useDataStore().getItemById(
          ingredient.id,
          "ingredients"
        );
        price += item.price * ingredient.count;
      }
      price += pizza.sauce.price;
      price += pizza.dough.price;
      price = price * pizza.size.multiplier;
      return price;
    },
    getCartPrice: (state) => {
      let price = 0;
      for (const pizza of state.cart.CartPizzas) {
        const sauce = useDataStore().getItemById(pizza.sauce.id, "sauces");
        const dough = useDataStore().getItemById(pizza.dough.id, "doughs");
        const size = useDataStore().getItemById(pizza.size.id, "sizes");
        const ingredients = pizza.ingredients;

        for (const ingredient of ingredients) {
          const item = useDataStore().getItemById(
            ingredient.id,
            "ingredients"
          );
          price += item.price * ingredient.count;
        }
        price += sauce.price;
        price += dough.price;
        price = price * size.multiplier;
      }

      for (const misc of state.cart.CartMisc) {
        price += misc.price * misc.count;
      }
      return price;
    },
    getCart: (state) => state.cart,
  },
  actions: {
    fetchOrders() {
      // TODO add logic
      if (this.orders.length === 0) {
        this.orders = ordersMock;
      }
      return this.orders;
    },

    sendOrder(address) {
      // TODO ADD LOGIC

      console.log(address);

      // GET USER INFO
      // TRANSFORM PIZZA AND MISC TO ORDER
      // ADD ADDRESS TO OBJECT
      // SEND

    },
    sendOrderNewAddress(address) {
      // TODO ADD LOGIC
      console.log(address);
    },
    sendOrderNoAddress() {
      // TODO ADD LOGIC
    },

    Reorder(order) {
      // TODO add logic
      // get order by id and add it with new random id to orders

      const orderNew = Object.assign({}, order);

      orderNew.id = Math.floor(Math.random() * 1000) + 1;
      orderNew.orderNumber = Math.floor(Math.random() * 1000) + 1;

      this.orders.push(orderNew);
    },
    addPizzaFromConstructorToCart(pizza) {
      // TODO add transform data logic
      // TODO add validation
      pizza.count = 1;
      pizza.id = pizza.doughId + pizza.sizeId + pizza.sauceId;
      pizza.image = "product.svg";
      this.cart.CartPizzas.push(pizza);
    },

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
        pizza.count += 1;
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
        misc.count += 1;
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
      pizza.count += 1;
    },
    MorePizzaToCart(index) {
      this.cart.CartPizzas[index].count += 1;
    },
    ReducePizzaToCart(index) {
      if (this.cart.CartPizzas[index].count > 1) {
        this.cart.CartPizzas[index].count -= 1;
      } else {
        this.cart.CartPizzas.splice(index, 1);
      }
    },
    MoreMiscToCart(id) {
      if (!this.cart.CartMisc.find((misc) => misc.id === id)) {
        const misc = useDataStore().getItemById(id, "misc");
        misc.count = 1;
        this.cart.CartMisc.push(misc);
      } else {
        // if count < 3
        if (this.cart.CartMisc.find((misc) => misc.id === id).count < 3) {
          this.cart.CartMisc.find((misc) => misc.id === id).count += 1;
        }
      }
    },
    ReduceMiscToCart(id) {
      if (this.cart.CartMisc.find((misc) => misc.id === id)) {
        if (this.cart.CartMisc.find((misc) => misc.id === id).count === 1) {
          this.cart.CartMisc.splice(
            this.cart.CartMisc.findIndex((misc) => misc.id === id),
            1
          );
        } else {
          this.cart.CartMisc.find((misc) => misc.id === id).count -= 1;
        }
      }
    }
  },
});
