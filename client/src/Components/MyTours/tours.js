import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Header from "../Navbar/Header";
import { store } from "../../App.js";

const Tours = () => {
  const { cartItems, setCartItems } = useContext(store);

  const removeItems = (key) => {
    const newset = cartItems.filter((ob, a) => a !== key);
    setCartItems([...newset]);
  };

  return (
    <div>
      <Header user={true} />
      {cartItems.length === 0 ? (
        <h1>Cart is Empty</h1>
      ) : (
        <div>
          <div className="item-class">
            {cartItems
              ? cartItems.map((item, key) => {
                  return (
                    <div className="item-box" key={key}>
                      <h2>From : {item.from}</h2>
                      <h2>To : {item.to}</h2>
                      <h2>Number of Adults: {item.adult}</h2>
                      <h2>Number of Child: {item.child}</h2>
                      <h2>Date of Departure: {item.depart}</h2>
                      <h2>Date of Arrival: {item.arrival}</h2>
                      <div className="addtocart">
                        <button
                          onClick={() => {
                            removeItems(key);
                          }}
                          className="book-btn btn-primary"
                        >
                          Remove{" "}
                        </button>
                      <Link to="/payment"><input type="submit" className="book-btn" value="Book" /></Link>
                      </div>
                    </div>
                  );
                })
              : ""}
          </div>
        </div>
      )}
    </div>
  );
};

export default Tours;
