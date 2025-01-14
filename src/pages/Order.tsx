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
    return <div>Loading...</div>;
  }

  const cancelOrder = async (id: string) => {
    try {
      const res = await api.delete(`cancelorder/${id}`);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {orders && orders.length > 0 ? (
        orders.map((order: Order) => {
          return (
            <Link
              to={`/order/${order._id}`}
              key={order._id}
              className="container mx-auto p-4"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold">
                    Order Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Order Info */}
                    <div className="space-y-2">
                      <h3 className="font-bold">Order ID: {order._id}</h3>
                      <p>
                        Status:{" "}
                        <span className="font-medium text-primary">
                          {order.status}
                        </span>
                      </p>
                      <p>
                        Order Date:{" "}
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                      <p>
                        Total Price:{" "}
                        <span className="font-medium text-lg">
                          ${order.totalPrice.toFixed(2)}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-center space-x-4">
                    {/* Update Order Button */}
                    <Button className="bg-green-500 text-white">
                      Mark as Fulfilled
                    </Button>

                    {/* Cancel Order Button */}
                    <Button
                      onClick={() => cancelOrder(order._id)}
                      className="bg-red-500 text-white"
                    >
                      Cancel Order
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })
      ) : (
        <div>No Orders Found!</div>
      )}
    </>
  );
};

export default OrderDetailScreen;
