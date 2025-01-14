import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../components/ui/card";
import { useSingleProduct } from "../context/SingleProduct.Context";
import { useCart } from "../context/Cart.context";
import Swal from "sweetalert2";

const SingleProductCard = ({
  title,
  description,
  image,
  price,
  createdAt,
  username,
}: any) => {
  const { cart, setCart } = useCart();
  const { singleProduct } = useSingleProduct();

  const addToCart = () => {
    if (!singleProduct) {
      console.error("No product to add to the cart");
      return; // Return early if no product is available
    }

    // Check if the product is already in the cart
    if (cart?.some((item) => item._id === singleProduct._id)) {
      // If the product is already in the cart, show SweetAlert
      Swal.fire({
        icon: "info",
        title: "Already in Cart",
        text: `${singleProduct.name} is already in your cart!`,
      });
    } else {
      // If not, add the product to the cart
      if (cart) {
        singleProduct.quantity = 1;
        setCart([...cart, singleProduct]); // Add the new product to the existing cart
        console.log(cart);
        localStorage.setItem("cart", JSON.stringify(cart));
      } else {
        setCart([singleProduct]); // Initialize the cart with the first product
        console.log(cart);
        localStorage.setItem("cart", JSON.stringify(cart));
      }

      // Show SweetAlert for success
      Swal.fire({
        icon: "success",
        title: "Added to Cart",
        text: `${singleProduct.name} has been added to your cart.`,
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6">
      <Card className="border border-gray-300 rounded-2xl shadow-lg">
        {/* Card Header with Product Title */}
        <CardHeader className="bg-gray-100 p-6 rounded-t-2xl">
          <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
        </CardHeader>

        {/* Card Body with Image, Description, and Price */}
        <CardContent>
          <div className="flex flex-col lg:flex-row items-start space-y-8 lg:space-y-0 lg:space-x-12 mt-10">
            {/* Product Image */}
            <div className="flex-shrink-0 w-full max-w-[420px]">
              <img
                src={image}
                alt={title}
                className="w-full h-[350px] object-cover rounded-lg shadow-md"
              />
            </div>

            {/* Product Details */}
            <div className="flex-grow px-6 lg:px-0">
              {/* Description */}
              <p className="text-gray-700 mb-6">{description}</p>

              {/* Price and User Info */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-3xl font-bold text-green-600">
                  ${price}
                </span>
                <span className="text-sm text-gray-500">
                  Created by {username}
                </span>
              </div>

              {/* Posted Date */}
              <div className="text-sm text-gray-500">
                <p>Posted on {new Date(createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </CardContent>

        {/* Card Footer with Add to Cart Button */}
        <CardFooter className="bg-gray-50 p-6 rounded-b-2xl flex justify-end">
          <button
            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            onClick={addToCart}
          >
            {cart && cart.some((item) => item._id === singleProduct?._id)
              ? "Added to the cart"
              : "Add to Cart"}
          </button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SingleProductCard;
