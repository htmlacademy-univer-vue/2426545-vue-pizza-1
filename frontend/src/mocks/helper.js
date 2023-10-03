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

// eslint-disable-next-line no-unused-vars
export const getIngredientsNameFromImg = (imgPath) => {
    return imgPath.split("/").pop().split(".")[0];
};