import { defineStore } from "pinia";

import doughService from "@/services/dough-service";
import sizeService from "@/services/size-service";
import ingredientService from "@/services/ingredient-service";
import miscService from "@/services/misc-service";
import sauceService from "@/services/sauce-service";

export const useDataStore = defineStore("data", {
  state: () => ({
    doughs: [],
    sizes: [],
    ingredients: [],
    misc: [],
    sauces: [],
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

        doughService.getDoughs().then((r) => {
          if (r.status !== 200) return;
          this.doughs = r.data;
        });
        sizeService.getSizes().then((r) => {
          if (r.status === 200) {
            this.sizes = r.data;
          }
        });
        ingredientService.getIngredients().then((r) => {
          if (r.status === 200) {
            this.ingredients = r.data
          }
        });

        miscService.getMisc().then((r) => {
          if (r.status === 200) {
            this.misc = r.data;
          }
        })
        sauceService.getSauces().then((r) => {
          if (r.status === 200) {
            this.sauces = r.data;
          }
        })
    },
  },
});
