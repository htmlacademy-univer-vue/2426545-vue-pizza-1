import { vi } from "vitest";
import * as services from "@/services";
import addressJSON from "../../mocks/addresses.json";
import miscJSON from "../../mocks/misc.json";
import doughJSON from "../../mocks/dough.json";
import sauceJSON from "../../mocks/sauces.json";
import sizeJSON from "../../mocks/sizes.json";
import ingredientJSON from "../../mocks/ingredients.json";
import orderJSON from "../../mocks/orders.json";
import profileJSON from "../../mocks/profile.json";

const mockDataStore = () => ({
  getItemById: (id, type) => {
    switch (type) {
      case "addresses":
        return addressJSON.find((item) => item.id === id);
      case "misc":
        return miscJSON.find((item) => item.id === id);
      case "doughs":
        return doughJSON.find((item) => item.id === id);
      case "sauces":
        return sauceJSON.find((item) => item.id === id);
      case "sizes":
        return sizeJSON.find((item) => item.id === id);
      case "ingredients":
        return ingredientJSON.find((item) => item.id === id);
      case "orders":
        return orderJSON.find((item) => item.id === id);
      case "profile":
        return profileJSON.find((item) => item.id === id);
    }
  },
});

const mockCartStore = () => ({
  getCart: () => ({
    CartMisc: [],
    CartPizza: [],
  }),
});

const mockProfileStore = () => ({
  getAddresses: () => addressJSON,
  getProfile: () => profileJSON,
});

const mockPizzaStore = () => ({
  pizza: {
    name: "Test",
    dough: mockDataStore().getItemById(1, "doughs"),
    size: mockDataStore().getItemById(1, "sizes"),
    sauce: mockDataStore().getItemById(1, "sauces"),
    ingredients: [],
  },
  getPizza: () => this.pizza,
  updateIngredientPizza: () => {},
});

vi.mock("@/services", () => ({
  ...services,
  useDataStore: vi.fn(mockDataStore),
  useCartStore: vi.fn(mockCartStore),
  useProfileStore: vi.fn(mockProfileStore),
  usePizzaStore: vi.fn(mockPizzaStore),
}));
