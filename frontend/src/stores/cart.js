import { defineStore } from "pinia";
import { useDataStore } from "./data";
import orderService from "@/services/order-service";
import { useProfileStore } from "@/stores/profile";
import { getToken } from "@/services/token-manager";
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
      if (order.orderPizzas === undefined) {
        return price;
      }
      for (const pizza of order.orderPizzas) {
        const sauce = dataStore.getItemById(pizza.sauceId, "sauces");
        const dough = dataStore.getItemById(pizza.doughId, "doughs");
        const size = dataStore.getItemById(pizza.sizeId, "sizes");
        const ingredients = pizza.ingredients;

        for (const ingredient of ingredients) {
          const item = dataStore.getItemById(
            ingredient.ingredientId,
            "ingredients"
          );
          price += item.price * ingredient.quantity;
        }

        if (order.orderMisc && order.orderMisc.length > 0) {
          for (const misc of order.orderMisc) {
            const miscD = dataStore.getItemById(misc.miscId, "misc");
            price += miscD.price * misc.quantity;
          }
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

      if (pizza.ingredients === undefined || pizza.ingredients.length === 0) {
        return price;
      }
      for (const ingredient of ingredients) {
        const item = useDataStore().getItemById(ingredient.id, "ingredients");
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
        let pizzaPrice = 0;
        const sauce = useDataStore().getItemById(pizza.sauce.id, "sauces");
        const dough = useDataStore().getItemById(pizza.dough.id, "doughs");
        const size = useDataStore().getItemById(pizza.size.id, "sizes");
        const ingredients = pizza.ingredients;

        for (const ingredient of ingredients) {
          const item = useDataStore().getItemById(ingredient.id, "ingredients");
          pizzaPrice += item.price * ingredient.count;
        }
        pizzaPrice += sauce.price;
        pizzaPrice += dough.price;
        price += pizzaPrice * size.multiplier;
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
      if (getToken() === undefined) {
        return;
      }
      orderService.getOrders().then((r) => {
        if (r.status !== 200) {
          return;
        }
        this.orders = r.data;
      });
    },
    clearCart() {
      this.cart = {
        CartPizzas: [],
        CartMisc: [],
      };
    },
    sendOrder(address, phone) {
      const user = useProfileStore().getProfile;

      const pizzasFromStore = this.getCart.CartPizzas;
      let pizzasRequest = [];
      for (const pizza of pizzasFromStore) {
        let pizzaRequest = {
          name: pizza.name,
          sauceId: pizza.sauce.id,
          doughId: pizza.dough.id,
          sizeId: pizza.size.id,
          quantity: pizza.count,
          ingredients: [],
        };
        for (const ingredient of pizza.ingredients) {
          pizzaRequest.ingredients.push({
            ingredientId: ingredient.id,
            quantity: ingredient.count,
          });
        }
        pizzasRequest.push(pizzaRequest);
      }

      const miscFromStore = this.getCart.CartMisc;
      let miscRequest = [];
      for (const misc of miscFromStore) {
        miscRequest.push({
          miscId: misc.id,
          quantity: misc.count,
        });
      }

      const order = {
        userId: user.id,
        phone: phone,
        address: {
          street: address.street,
          building: address.building,
          flat: address.flat,
          comment: address.comment,
        },
        pizzas: pizzasRequest,
        misc: miscRequest,
      };
      orderService.postOrder(order).then((r) => {
        if (r.status !== 200) {
          alert("Error sending order");
          return;
        }
        this.fetchOrders();
        this.clearCart();
      });
    },
    sendOrderWithNew(address, phone) {
      const user = useProfileStore().getProfile;

      address.name = "Новый адрес";

      let ok = useProfileStore().addAddress(address);

      if (!ok) {
        return;
      }

      const pizzasFromStore = this.getCart.CartPizzas;
      let pizzasRequest = [];
      for (const pizza of pizzasFromStore) {
        let pizzaRequest = {
          name: pizza.name,
          sauceId: pizza.sauce.id,
          doughId: pizza.dough.id,
          sizeId: pizza.size.id,
          quantity: pizza.count,
          ingredients: [],
        };
        for (const ingredient of pizza.ingredients) {
          pizzaRequest.ingredients.push({
            ingredientId: ingredient.id,
            quantity: ingredient.count,
          });
        }
        pizzasRequest.push(pizzaRequest);
      }

      const miscFromStore = this.getCart.CartMisc;
      let miscRequest = [];
      for (const misc of miscFromStore) {
        miscRequest.push({
          miscId: misc.id,
          quantity: misc.count,
        });
      }

      const order = {
        userId: user.id,
        phone: phone,
        address: {
          street: address.street,
          building: address.building,
          flat: address.flat,
          comment: address.comment,
        },
        pizzas: pizzasRequest,
        misc: miscRequest,
      };
      orderService.postOrder(order).then((r) => {
        if (r.status !== 200) {
          alert("Error sending order");
          return;
        }
        this.fetchOrders();
        this.clearCart();
      });
    },
    sendOrderNoAddress(phone) {
      const user = useProfileStore().getProfile;

      const pizzasFromStore = this.getCart.CartPizzas;
      let pizzasRequest = [];
      for (const pizza of pizzasFromStore) {
        let pizzaRequest = {
          name: pizza.name,
          sauceId: pizza.sauce.id,
          doughId: pizza.dough.id,
          sizeId: pizza.size.id,
          quantity: pizza.count,
          ingredients: [],
        };
        for (const ingredient of pizza.ingredients) {
          pizzaRequest.ingredients.push({
            ingredientId: ingredient.id,
            quantity: ingredient.count,
          });
        }
        pizzasRequest.push(pizzaRequest);
      }

      const miscFromStore = this.getCart.CartMisc;
      let miscRequest = [];
      for (const misc of miscFromStore) {
        miscRequest.push({
          miscId: misc.id,
          quantity: misc.count,
        });
      }

      const order = {
        userId: user.id,
        phone: phone,
        pizzas: pizzasRequest,
        misc: miscRequest,
      };

      orderService.postOrder(order).then((r) => {
        if (r.status !== 200) {
          alert("Error sending order");
          return;
        }
        this.fetchOrders();
        this.clearCart();
      });
    },

    Reorder(order) {
      const orderNew = {
        userId: order.userId,
        phone: order.phone,
        address: order.orderAddress,
        pizzas: order.orderPizzas,
        misc: order.orderMisc,
      };

      orderService.postOrder(orderNew).then((r) => {
        if (r.status !== 200) {
          alert("Error reorder order");
          return;
        }
        this.orders.push(r.data);
      });
    },
    addPizzaFromConstructorToCart(pizza) {
      // TODO add transform data logic
      // TODO add validation
      pizza.count = 1;
      pizza.id = pizza.doughId + pizza.sizeId + pizza.sauceId;
      pizza.image = "public/img/product.svg";
      this.cart.CartPizzas.push(pizza);
    },
    deleteOrder(id) {
      orderService.deleteOrder(id).then((r) => {
        if (r.status === 200 || r.status === 204) {
          this.fetchOrders();
        } else {
          alert("Error deleting order");
        }
      });
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
    },
  },
});
