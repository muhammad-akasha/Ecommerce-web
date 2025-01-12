import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "../mycomponents/ProductCard";
import { Link } from "react-router-dom";
import { useProducts } from "../context/UserProducts.Context";
import Loading from "../mycomponents/Loading";

const MyProducts = () => {
  const { products, setProducts } = useProducts();
  const [loading, setLoading] = useState(true);

  const userProduct = async () => {
    setLoading(true);
    try {
      const res = await axios("http://localhost:3000/api/v1/getuserads", {
        withCredentials: true,
      });
      console.log(res);
      setProducts(res.data.userAds);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!products || products.length === 0) {
      userProduct();
    }
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex gap-4 flex-wrap justify-center">
      {products && products.length > 0 ? (
        products.map((item) => (
          <div key={item._id}>
            <ProductCard
              name={item.name}
              image={item.image}
              price={item.price}
              showBtn={true}
              id={item._id}
            />
          </div>
        ))
      ) : (
        <p className="my-4 font-semibold text-2xl">No Ads found!</p>
      )}
    </div>
  );
};

export default MyProducts;
