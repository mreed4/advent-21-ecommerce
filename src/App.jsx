import { useState } from "react";
import "./App.css";
import menuItems from "./assets/menuItems.js";

function numberToCurrency(number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(number);
}

function App() {
  const [cart, setCart] = useState([]);
  const [menu, setMenu] = useState(menuItems);

  function addMenuItemToCart(item) {
    console.log("addMenuItemToCart", item);

    if (cart.find((cartItem) => cartItem.id === item.id)) {
      return;
    }

    setCart([...cart, { ...item, count: 1 }]);
  }

  function removeMenuItemFromCart(item) {
    console.log("removeMenuItemFromCart", item);

    const updatedCart = cart.filter((cartItem) => cartItem.id !== item.id);

    setCart(updatedCart);
  }

  function handleIncreaseQuantity(item) {
    console.log("handleIncreaseQuantity", item);
    const updatedCart = cart.map((cartItem) => {
      if (cartItem.id === item.id) {
        return { ...cartItem, count: cartItem.count + 1 };
      }
      return cartItem;
    });

    setCart(updatedCart);
  }

  function handleDecreaseQuantity(item) {
    console.log("handleDecreaseQuantity", item);
    const updatedCart = cart.map((cartItem) => {
      if (cartItem.id === item.id) {
        if (cartItem.count === 1) {
          return removeMenuItemFromCart(item);
        }
        return { ...cartItem, count: cartItem.count - 1 };
      }
      return cartItem;
    });
    setCart(updatedCart);
  }

  function getCartSubtotal() {
    let subtotal = cart.reduce((acc, item) => acc + item.price * item.count, 0);
    return subtotal;
  }

  function getCartTax() {
    let tax = getCartSubtotal() * 0.0975;
    return tax;
  }

  function getCartTotal() {
    let total = getCartSubtotal() + getCartTax();
    return total;
  }

  function MenuItem({ item }) {
    return (
      <li>
        <div className="plate">
          <img src={item.image} alt={item.name} className="plate" />
        </div>
        <div className="content">
          <p className="menu-item">{item.name}</p>
          <p className="price">{numberToCurrency(item.price)}</p>
          <button className={cart.find((cartItem) => cartItem.id === item.id) ? "in-cart" : "add"} onClick={() => addMenuItemToCart(item)}>
            {cart.find((cartItem) => cartItem.id === item.id) ? <>In Cart</> : "Add to Cart"}
          </button>
        </div>
      </li>
    );
  }

  function CartItem({ item }) {
    return (
      <li>
        <div className="plate">
          <img src={item.image} alt={item.name} className="plate" />
          <div className="quantity">{item.count}</div>
        </div>
        <div className="content">
          <p className="menu-item">{item.name}</p>
          <p className="price">{numberToCurrency(item.price)}</p>
        </div>
        <div className="quantity__wrapper">
          <button className="decrease" onClick={() => handleDecreaseQuantity(item)} disabled={item.count === 1}>
            <img src="/chevron.svg" />
          </button>
          <div className="quantity">{item.count}</div>
          <button className="increase" onClick={() => handleIncreaseQuantity(item)} disabled={item.count === 10}>
            <img src="/chevron.svg" />
          </button>
        </div>
        <div className="subtotal">{numberToCurrency(item.price * item.count)}</div>
        <button className="remove" onClick={() => removeMenuItemFromCart(item)}>
          <span class="material-symbols-outlined">delete</span>
        </button>
      </li>
    );
  }

  return (
    <div className="wrapper menu">
      <div className="panel">
        <h1>To Go Menu</h1>
        <ul className="menu">
          {menu.map((item, i) => (
            <MenuItem item={item} key={i} />
          ))}
        </ul>
      </div>

      <div className="panel cart">
        <h1>Your Cart</h1>
        {cart.length === 0 && <p className="empty">Your cart is empty.</p>}
        {cart.length > 0 && (
          <>
            <ul className="cart-summary">
              {cart.map((item, i) => (
                <CartItem item={item} key={i} />
              ))}
            </ul>

            <div className="totals">
              <div className="line-item">
                <div className="label">Subtotal:</div>
                <div className="amount price subtotal">{numberToCurrency(getCartSubtotal())}</div>
              </div>
              <div className="line-item">
                <div className="label">Tax:</div>
                <div className="amount price tax">{numberToCurrency(getCartTax())}</div>
              </div>
              <div className="line-item total">
                <div className="label">Total:</div>
                <div className="amount price total">{numberToCurrency(getCartTotal())}</div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
