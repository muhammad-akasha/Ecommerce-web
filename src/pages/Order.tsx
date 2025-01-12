import { useEffect } from "react";
import OrderTable from "../mycomponents/OrderTable";
import { useCart } from "../context/Cart.context";

const Order = () => {
  const { cart } = useCart();
  useEffect(() => {
    console.log(cart);
  }, []);
  return <OrderTable />;
};

export default Order;
