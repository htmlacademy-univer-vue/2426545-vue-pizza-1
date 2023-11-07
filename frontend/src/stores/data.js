import { defineStore } from "pinia";

export const useDataStore = defineStore("data", {
  state: () => {
    return {
      doughs: getData("dough.json"),
      sizes: getData("sizes.json"),
      ingredients: getData("ingredients.json"),
      misc: getData("misc.json"),
      sauces: getData("sauces.json"),
    };
  },
  getters: {
    getDoughs: (state) => state.doughs,
    getSizes: (state) => state.sizes,
    getIngredients: (state) => state.ingredients,
    getMisc: (state) => state.misc,
    getSauces: (state) => state.sauces,
  },
  actions: {},
});

async function getData(path) {
  // TODO Swap to server request
  const response = await fetch(`../mocks/${path}`);
  return await response.json();
}
