const getShoppingCart = () => {
    let storedCart = {};

    const exist = localStorage.getItem('shopping-cart')
    if (exist) {
        storedCart = JSON.parse(exist)
    }
    console.log(storedCart)
    return storedCart;
}
const setShoppingCart = (id) => {
    const storedCart = getShoppingCart()

    const exist = storedCart[id];
    if (!exist) {
        storedCart[id] = 1;
    }
    else {
        const newQuantity = storedCart[id] + 1;
        storedCart[id] = newQuantity;
    }

    localStorage.setItem('shopping-cart', JSON.stringify(storedCart))
}
export { getShoppingCart, setShoppingCart };

