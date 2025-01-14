import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "../components/ui/card";
import { api } from "../axios-interceptor/axios";

interface Product {
  productId: {
    _id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  };
  price: number;
  quantity: number;
}

interface Order {
  _id: string;
  status: string;
  products: Product[];
  totalPrice: number;
  createdAt: string;
}

const SingleOrder = () => {
  const { id } = useParams();
  const [order, setOrder] = useState<Order | null>(null);

  const getSingleOrder = async () => {
    try {
      const response = await api.get(`order/${id}`);
      setOrder(response.data.order);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleOrder();
  }, []);
  return (
    <div className="space-y-4 mx-5 md:mx-20">
      <h2 className="font-semibold text-xl text-center my-5">
        Ordered Products
      </h2>
      {order &&
        order.products.map((product: Product) => {
          const { image, price, name, _id } = product.productId;
          const { quantity } = product;
          return (
            <Card key={_id} className="p-4 border rounded-lg">
              <div className="flex space-x-4 items-center">
                {/* Product Image */}
                <div className="w-32 h-32 flex-shrink-0">
                  <img
                    src={image}
                    alt={name}
                    className="object-cover w-full h-full rounded-lg shadow-lg"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-grow">
                  <h3 className="font-semibold">{name}</h3>
                  <p className="text-sm">Price: {price}</p>
                  <p className="text-sm">Quantity: {quantity}</p>
                  <p className="font-medium text-lg">
                    Total: {price * quantity}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
    </div>
  );
};

export default SingleOrder;
