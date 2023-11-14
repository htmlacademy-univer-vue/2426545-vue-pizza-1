import { defineStore } from "pinia";
import  doughs from "../mocks/dough.json";
import  sizes from "../mocks/sizes.json";
import  ingredients from "../mocks/ingredients.json";
import  misc from "../mocks/misc.json";
import  sauces from "../mocks/sauces.json";
export const useDataStore = defineStore("data", {
  state: () => ({
    doughs: doughs,
    sizes: sizes,
    ingredients: ingredients,
    misc: misc,
    sauces: sauces,
  }),
  getters: {
    getDoughs: (state) => state.doughs,
    getSizes: (state) => state.sizes,
    getIngredients: (state) => state.ingredients,
    getMisc: (state) => state.misc,
    getSauces: (state) => state.sauces,
    getItemById: (state) => (id, type) => {
      return state[type].find((item) => item.id === id);
    },
  },
  actions: {
    fetchData() {
      if (!this.doughs || !this.sizes || !this.ingredients || !this.misc || !this.sauces) {
        this.doughs = getData("dough.json");
        this.sizes = getData("sizes.json");
        this.ingredients = getData("ingredients.json");
        this.misc = getData("misc.json");
        this.sauces = getData("sauces.json");
      }
    }
  },
});

async function getData(path) {
  // TODO Swap to server request
  const response = await fetch(`../mocks/${path}`);
  return await response.json();
}
