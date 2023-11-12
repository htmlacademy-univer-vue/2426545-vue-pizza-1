import {defineStore} from "pinia";
import {useDataStore} from "./data";
export const usePizzaStore = defineStore("pizza", {
  state: () => ({
    pizza: {
      name: "",
      dough: useDataStore().getItemById(1, "doughs"),
      size: useDataStore().getItemById(1, "sizes"),
      sauce: useDataStore().getItemById(1, "sauces"),
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
    getIngredientPizzaCount: (state) => (id) => {
      const item = state.pizza.ingredients.find((item) => item.id === id);
      return item ? item.quantity : 0;
    }
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
    updateIngredientPizza(ingredient, count) {
      const existingIngredient = this.pizza.ingredients.find(
        (item) => item.id === ingredient.id
      );
      if (existingIngredient) {
        this.pizza.ingredients = this.pizza.ingredients.map((item) =>
          item.id === ingredient.id ? { ...ingredient, quantity: count } : item
        );
      } else {
        this.pizza.ingredients.push({ ...ingredient, quantity: count });
      }
    },
    deleteIngredientPizza(ingredientId) {
      this.pizza.ingredients = this.pizza.ingredients.filter(
        (item) => item.id !== ingredientId
      );
    },
    clearConstructorPizza() {
      this.pizza = {
        name: "",
        dough: useDataStore().getItemById(1, "doughs"),
        size: useDataStore().getItemById(1, "sizes"),
        sauce: useDataStore().getItemById(1, "sauces"),
        ingredients: [],
      }
    }
  },
});
