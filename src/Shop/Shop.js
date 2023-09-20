import React, { useState, useEffect } from "react";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";
import { getShoppingCart, setShoppingCart } from "../Utils/Utils";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  // console.log(products);

  useEffect(() => {
    fetch("data.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  useEffect(() => {
    const storedCart = getShoppingCart();
    let savedCart = [];

    for (const id in storedCart) {
      const storedProduct = products.find(product => product.id == id);

      if (storedProduct) {
        const quantity = storedCart[id];
        storedProduct.quantity = quantity;
        savedCart.push(storedProduct)
      }
    }
    setCart(savedCart)
  }, [products])

  const handleAddToCart = (selectedProduct) => {
    let newCart = [];
    const exist = cart.find(product => product.id == selectedProduct.id);

    if (!exist) {
      selectedProduct.quantity = 1;
      newCart = [...cart, selectedProduct]
    }
    else {
      selectedProduct.quantity += 1;
      const remaining = cart.filter(product => product.id != selectedProduct.id);
      newCart = [...remaining, selectedProduct]
    }
    setCart(newCart)
    setShoppingCart(selectedProduct.id)
  };



  const handleClearCart = () => {
    setCart([])
  };

  return (
    <>
      <div className='shop'>
        <div className='products-container'>
          {products.map((product, index) => {
            return (
              <Product
                key={index}
                product={product}
                handleAddToCart={handleAddToCart}
              />
            );
          })}
        </div>
        <div className='cart-container'>
          <Cart
            cart={cart}
            products={products}
            handleClearCart={handleClearCart}
          />
        </div>
      </div>
    </>
  );
};

export default Shop;
