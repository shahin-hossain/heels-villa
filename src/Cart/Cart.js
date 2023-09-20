import React, { useEffect, useState } from "react";
import "./Cart.css";
import { IoTrashBin } from "react-icons/io5";
import { getShoppingCart } from "../Utils/Utils";

const Cart = ({ cart, products, handleClearCart }) => {
  const [offer, setOffer] = useState(false)
  const [freeProduct, setFreeProduct] = useState({})

  useEffect(() => {
    // console.log(cart)
    if (cart.length > 0) {
      setOffer(true)

    }
    else {
      setOffer(false)
    }
  }, [cart])

  const handleOfferedProduct = () => {
    if (products.length) {
      const randomProduct = Math.round(Math.random() * products.length)
      const item = products[randomProduct]

      item.quantity = 1;

      setFreeProduct(item)
    }

  }
  return (
    <div className='cart'>
      <div className='cart-header'>
        <h1>Order Summery</h1>
        <button
          onClick={handleClearCart}
          className='remove-button'
          title='Clear Cart'
        >
          <IoTrashBin color='white' size={20} />
        </button>
      </div>
      {cart.map((product, index) => (
        <div key={index} className='cart-item'>
          <img src={product.pairImage} alt='' />
          <div>
            <p>
              {product.name} {product.color}
            </p>
            <p>$ {product.price}</p>
            <p>{product.quantity}</p>
          </div>

        </div>
      ))}
      <div>
        <p>Buy One get One</p>
        <button className={
          offer ? "offer-button" : "offer-button-disabled"
        }
          onClick={handleOfferedProduct}
          disabled={!offer}
        >Get Your Free Product</button>
        {Object.keys(freeProduct).length > 0 && (
          <div className='cart-item ' >
            <img src={freeProduct.pairImage} alt='' />
            <div>
              <p>
                {freeProduct.name} {freeProduct.color}
              </p>
              <p>$ {freeProduct.price}</p>
              <p>{freeProduct.quantity}</p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default Cart;
