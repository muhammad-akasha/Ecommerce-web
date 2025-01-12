import React from "react";
import { useCart } from "../context/Cart.context";
import { Button } from "../components/ui/button";

const OrderTable = () => {
  const { cart } = useCart();
  return (
    <div>
      <h2 className="text-center text-2xl font-semibold my-6">Cart Items</h2>
      <div className="flex justify-center gap-5 my-6 mx-5">
        <div className="w-[70%]">
          {cart && cart.length > 0 ? (
            cart.map((item) => {
              return (
                <div
                  className="shadow-lg p-3 border-2 border-white rounded-md flex justify-start items-center gap-5 m-auto"
                  key={item._id}
                >
                  <div>
                    <img className="w-32 h-32" src={item.image} alt="item" />
                  </div>
                  <div className="font-semibold">
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <p>Price: ${item.price}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <p>Your cart is empty!</p>
          )}
        </div>
        <div className="border-2 border-gray-200 shadow-lg rounded-lg w-[30%] h-fit p-8 bg-white">
          <h3 className="text-center font-semibold text-xl text-gray-800 mb-4">
            Order Details
          </h3>

          <h5 className="text-center text-gray-600 mb-2">
            Total Items: {cart && cart.length}
          </h5>

          <div className="mb-4 text-center">
            <h6 className="text-gray-700 text-center">Total Price:</h6>
            <strong className="text-lg text-green-600">
              ${cart?.reduce((total, item) => total + item.price, 0).toFixed(2)}
            </strong>
          </div>

          <div className="flex justify-center mt-4">
            <button className="bg-blue-500 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
              Order Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTable;
