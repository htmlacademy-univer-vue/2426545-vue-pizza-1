export const getDoughType = (name) => {
  switch (name) {
    case "Тонкое":
      return "light";
    case "Толстое":
      return "large";
  }
};
// eslint-disable-next-line no-unused-vars
export const getPizzaSize = (name) => {
  switch (name) {
    case "23 см":
      return "small";
    case "32 см":
      return "normal";
    case "45 см":
      return "big";
  }
};

export const getIngredientNamesFromArray = (ingredients) => {
  return ingredients.map((ingredient) => ingredient.name).join(", ");
}

// eslint-disable-next-line no-unused-vars
export const getIngredientsNameFromImg = (imgPath) => {
  return imgPath.split("/").pop().split(".")[0];
};

export const getSauceName = (name) => {
  switch (name) {
    case "Томатный":
      return "tomato";
    case "Сливочный":
      return "creamy";
  }
};

export const getDoughSizeForConstructor = (dough) => {
  switch (dough) {
    case "Тонкое":
      return "small";
    case "Толстое":
      return "big";
  }
};

export const getIngredientAmountClass = (countValue) => {
  let count = "";
  switch (countValue) {
    case 2:
      count = "pizza__filling--second";
      break;
    case 3:
      count = "pizza__filling--third";
  }
  return count;
};
