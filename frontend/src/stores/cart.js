import {defineStore} from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    cart: []
  }),
    getters: {
      getCart: (state) => state.cart
    },
    actions: {
      addPizzaToCart(pizza) {
        this.cart.push(pizza)
      }
    }
})