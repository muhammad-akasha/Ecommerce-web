import { useEffect, useState } from "react";
import ProductCard from "../mycomponents/ProductCard";
import axios from "axios";
import Loading from "../mycomponents/Loading";
import { useHomeProducts } from "../context/HomePageProduct.context";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const { products, setProducts } = useHomeProducts();

  const getProduct = async () => {
    setLoading(true);
    try {
      const res = await axios("http://localhost:3000/api/v1/allproduct");
      console.log(res.data.ads);
      setProducts(res.data.ads);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!products || products.length === 0) {
      getProduct();
    }
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <h1 className="text-center font-semibold text-4xl my-4">All Products</h1>
      <div className="flex flex-wrap justify-center gap-5">
        {products &&
          products.map((item) => {
            return (
              <div key={item._id}>
                <ProductCard
                  name={item.name}
                  price={item.price}
                  image={item.image}
                  showBtn={false}
                  id={item._id}
                />
              </div>
            );
          })}

        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index}>
            <ProductCard />
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
