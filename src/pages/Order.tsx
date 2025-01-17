import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { api } from "../axios-interceptor/axios";
import Loading from "../mycomponents/Loading";

interface Order {
  _id: string;
  status: string;
  totalPrice: number;
  createdAt: string;
}

const OrderDetailScreen = () => {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch order details from the server using axios (you may need to replace this URL)
  useEffect(() => {
    setLoading(true);
    const fetchOrderDetails = async () => {
      try {
        const response = await api.get(`getuserorder`);
        setOrders(response.data.userOrders.orders);
        console.log(response.data.userOrders.orders);
      } catch (error) {
        console.error("Error fetching order details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, []);

  // Render loading message while fetching data
  if (loading) {
    return <Loading />;
  }

  const cancelOrder = async (id: string) => {
    try {
      const res = await api.delete(`cancelorder/${id}`);
      console.log(res);
      const index = orders?.findIndex(
        (item) => item._id.toString() === id.toString()
      );
      if (index !== -1 && orders) {
        const updatedOrders = orders.filter((_, i) => i !== index);
        setOrders(updatedOrders);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {orders && orders.length > 0 ? (
        orders.map((order: Order) => {
          return (
            <Card
              key={order._id}
              className="container mx-auto p-4 my-10 bg-white dark:bg-gray-800 shadow-md rounded-lg"
            >
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-gray-800 dark:text-white">
                  Order Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Link to={`/order/${order._id}`} key={order._id}>
                  <div className="space-y-4">
                    {/* Order Info */}
                    <div className="space-y-2">
                      <h3 className="font-bold text-gray-800 dark:text-white">
                        Order ID: {order._id}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        Status:{" "}
                        <span className="font-medium text-primary dark:text-primary">
                          {order.status}
                        </span>
                      </p>
                      <p className="text-gray-700 dark:text-gray-300">
                        Order Date:{" "}
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-gray-700 dark:text-gray-300">
                        Total Price:{" "}
                        <span className="font-medium text-lg text-gray-800 dark:text-white">
                          ${order.totalPrice.toFixed(2)}
                        </span>
                      </p>
                    </div>
                  </div>
                </Link>

                <div className="mt-6 flex justify-center space-x-4">
                  {/* Update Order Button */}
                  <Button className="bg-green-500 text-white hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700">
                    Mark as Fulfilled
                  </Button>

                  {/* Cancel Order Button */}
                  <Button
                    onClick={() => cancelOrder(order._id)}
                    className="bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
                  >
                    Cancel Order
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })
      ) : (
        <div className="text-center my-10 text-3xl">No Orders Found!</div>
      )}
    </>
  );
};

export default OrderDetailScreen;
