import { useEffect, useState } from "react";
import data from "../data.json";
import cake from "../assets/images/illustration-empty-cart.svg";
import increaseIcon from "../assets/images/icon-increment-quantity.svg";
import decreaseIcon from "../assets/images/icon-decrement-quantity.svg";
import removeIcon from "../assets/images/icon-remove-item.svg";
import checkIcon from "../assets/images/icon-order-confirmed.svg";

function Desserts() {
  const [desserts, setDessert] = useState([]);
  const [orders, setOrders] = useState([]);
  const [checkout, setChehkout] = useState(false);
  useEffect(() => {
    setDessert(data);
  }, []);

  const addToCart = (dessert) => {
    const existingItem = orders.find((item) => item.name === dessert.name);
    if (existingItem) {
      increaseQuantity(dessert.name);
    } else {
      setOrders((prevOrder) => [...prevOrder, { ...dessert, quantity: 1 }]);
    }
  };

  const increaseQuantity = (dessertName) => {
    setOrders((prevOrder) =>
      prevOrder.map((item) =>
        item.name === dessertName
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (dessertName) => {
    setOrders(
      (prevOrder) =>
        prevOrder
          .map((item) =>
            item.name === dessertName
              ? { ...item, quantity: item.quantity - 1 } // Decrease quantity
              : item
          )
          .filter((item) => item.quantity > 0) // Remove items with quantity 0
    );
  };

  const removeFromCart = (dessertName) => {
    setOrders((prevOrder) =>
      prevOrder.filter((item) => item.name !== dessertName)
    );
  };

  const calculateTotal = () => {
    return orders.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="container mx-auto px-5 bg-rose-50 flex flex-col md:flex-row justify-around items-start">
      <section className="w-full md:w-3/4 md:max-lg:pl-10 lg:pl-20 mx-auto">
        <h1 className="text-3xl leading-none tracking-tight text-rose-900 font-bold md:text-4xl lg:text-5xl mb-4">
          Desserts
        </h1>

        <div className="w-full mx-auto">
          {desserts.length === 0 ? (
            <p>Loading data...</p>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {desserts.map((dessert) => (
                <li
                  key={dessert.id}
                  className="relative my-3 flex w-full flex-col overflow-hidden rounded-lg"
                >
                  <div className="flex h-auto w-auto flex-col relative">
                    <a
                      className="mx-3 mt-3 h-auto overflow-hidden rounded-xl"
                      href="#"
                    >
                      <picture>
                        <source
                          media="(min-width: 1024px)"
                          srcSet={dessert.image.desktop}
                        />
                        <source
                          media="(min-width: 768px)"
                          srcSet={dessert.image.tablet}
                        />
                        <img
                          src={dessert.image.mobile}
                          alt="A delicious dessert"
                          className="w-full h-auto"
                        />
                      </picture>
                    </a>
                    <div
                      className={`flex flex-row items-center justify-center w-[200px] md:w-[150px] mx-auto ${
                        orders.some((item) => item.name === dessert.name)
                          ? "bg-red"
                          : "bg-white"
                      } px-5 py-2.5 text-center text-sm md:text-xs font-semibold hover:text-red hover:border-red hover:border-2 border-2 ${
                        orders.some((item) => item.name === dessert.name)
                          ? "border-red"
                          : "border-rose-500"
                      } dessert-button absolute`}
                      style={{
                        justifySelf: "flex-end",
                        alignSelf: "flex-end",
                        zIndex: "1",
                        borderRadius: "100px",
                        transition: "all 0.4s ease",
                        bottom: "-20px",
                        left: "50%",
                        transform: "translateX(-50%)",
                      }}
                    >
                      {orders.some((item) => item.name === dessert.name) ? (
                        <div className="w-full flex justify-between items-center text-white text-sm">
                          <img
                            src={decreaseIcon}
                            alt="decrease"
                            onClick={() => decreaseQuantity(dessert.name)}
                            className="cursor-pointer"
                          />
                          <span>
                            {orders.find((item) => item.name === dessert.name)
                              ?.quantity || 1}
                          </span>
                          <img
                            src={increaseIcon}
                            alt="increase"
                            onClick={() => increaseQuantity(dessert.name)}
                            className="cursor-pointer"
                          />
                        </div>
                      ) : (
                        <button
                          onClick={() => addToCart(dessert)}
                          className="inline p-0"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="mr-2 h-6 w-6 text-red inline"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                          </svg>
                          Add to cart
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="mt-12 px-5 pb-5">
                    <p className="text-sm text-rose-400">{dessert.category}</p>
                    <a href="#">
                      <h5 className="text-xl tracking-tight text-rose-900">
                        {dessert.name}
                      </h5>
                    </a>
                    <div className="mt-2 mb-1 flex items-center justify-between">
                      <p className="text-xl font-medium text-red">
                        ${dessert.price}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
      <section className="w-full md:w-1/4 bg-white rounded-xl p-5">
        <p className="text-red text-md md:text-xl lg:text-2xl font-bold">
          Your Cart ({orders.length})
        </p>
        {orders.length > 0 ? (
          <div>
            {orders.map((item) => (
              <div key={item.name} className="my-2">
                <p className="font-bold text-[18px] my-1">{item.name}</p>
                <p className="flex items-center justify-between">
                  <span className="text-red text-sm">{item.quantity}</span>
                  <span className="text-rose-400 text-sm mx-8">
                    @ ${item.price}
                  </span>
                  <span className="text-red font-bold">
                    ${item.price * item.quantity}
                  </span>
                  <img
                    onClick={() => removeFromCart(item.name)}
                    className="inline"
                    style={{
                      border: "1px solid black",
                      borderRadius: "100px",
                      width: "18px",
                      height: "18px",
                      cursor: "pointer",
                    }}
                    src={removeIcon}
                    alt="remove icon"
                  />
                </p>
              </div>
            ))}
            <div className="mt-4 border-t border-rose-400 pt-2 flex items-center justify-between">
              <p className="text-red font-bold text-lg">Total:</p>
              <p className="text-red font-bold text-lg">${calculateTotal()}</p>
            </div>
            <button
              className="text-white bg-red border-0 w-full  p-2 my-2 rounded-full cursor-pointer font-medium"
              onClick={() => {
                setChehkout(true);
              }}
            >
              Confirm Order{" "}
            </button>
          </div>
        ) : (
          <img src={cake} alt="a piece of cake" />
        )}
      </section>

      {/* checkout  */}
      <section
        className={`${
          checkout ? "block" : "hidden"
        } checkout-section flex items-center justify-center`}
      >
        <div className="checkout-div mx-auto bg-rose-100 p-5 rounded-sm">
          <img src={checkIcon} alt="check mark" />
          <p className="mt-2 mb-1 h1 font-bold text-3xl text-rose-900">
            Order Confirmed
          </p>
          <p className="mb-2 text-rose-300 text-sm">
            We hope you enjoy your food{" "}
          </p>
          {orders.map((item) => (
            <div
              key={item.name}
              className="my-2 flex items-start bg-rose-50 rounded-sm "
            >
              <img
                src={item.image.thumbnail}
                alt="tasty cake"
                className="w-[50px] h-[50px] inline rounded-sm mr-4"
              />
              <div className="inline ">
                <p className="font-bold text-[18px] my-1">{item.name}</p>
                <p className="flex items-center justify-baseline">
                  <span className="text-red text-sm">{item.quantity}x</span>
                  <span className="text-rose-400 text-sm mx-8">
                    @ ${item.price}
                  </span>
                  <span className="text-red font-bold">
                    ${item.price * item.quantity}
                  </span>
                </p>
              </div>
            </div>
          ))}
          <div className="mt-4 pt-2 flex items-center justify-between">
            <p className="text-red font-bold text-lg">Total:</p>
            <p className="text-red font-bold text-lg">${calculateTotal()}</p>
          </div>
          <button
            className="text-white bg-red border-0 w-full  p-2 my-2 rounded-full cursor-pointer font-medium"
            onClick={() => {
              setChehkout(false);
              setOrders([]);
            }}
          >
            Start new order
          </button>
        </div>
      </section>
    </div>
  );
}

export default Desserts;
