export function getImageUrl (path) {
    const publicUrl = '/api'
    return `${publicUrl}${path}`
    // return new URL(`/src/assets/img/${path}`, import.meta.url).href;
}

export function getStringFromArrayIngredients(ingredients) {
    return ingredients.map((item) => item.name).join(", ");
}

export function getOrderAddressStringFromAddressObj(address) {
    if (!address) {
        return "";
    }
    return `${address.street}, д.${address.building}, кв.${address.flat}`;
}