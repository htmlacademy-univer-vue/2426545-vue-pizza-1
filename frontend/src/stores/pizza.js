import {defineStore} from "pinia";


export const usePizzaStore = defineStore("pizza", {
    state: () => ({
        pizzas: []
    }),
    getters: {
        getPizzas: (state) => state.pizzas
    },
    actions: {
        addPizza(pizza) {
            this.pizzas.push(pizza)
        }
    }
})