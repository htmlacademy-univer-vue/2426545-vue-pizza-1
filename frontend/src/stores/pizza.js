import { defineStore } from "pinia";

export const usePizzaStore = defineStore("pizza", {
  state: () => ({
    pizza: {
      name: "",
      dough: {},
      size: {},
      sauce: {},
      ingredients: [],
    },
  }),
  getters: {
    getPizza: (state) => state.pizza,
    getPizzaIngredients: (state) => state.pizza.ingredients,
    getPizzaSize: (state) => state.pizza.size,
    getPizzaSauce: (state) => state.pizza.sauce,
    getPizzaDough: (state) => state.pizza.dough,
    getPizzaName: (state) => state.pizza.name,
  },
  actions: {
    // ADD Objects to pizza
    setDoughToPizza(dough) {
      this.pizza.dough = dough;
    },
    setSizeToPizza(size) {
      this.pizza.size = size;
    },
    setSauceToPizza(sauce) {
      this.pizza.sauce = sauce;
    },
    addIngredientToPizza(ingredient) {
      const existingIngredient = this.pizza.ingredients.find(
        (item) => item.id === ingredient.id
      );

      if (existingIngredient) {
        if (existingIngredient.quantity < 3) {
          existingIngredient.quantity += 1;
        }
      } else {
        this.pizza.ingredients.push({ ...ingredient, quantity: 1 });
      }
    },
  },
});
