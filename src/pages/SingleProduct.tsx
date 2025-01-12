import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SingleProductCard from "../mycomponents/SingleProductCard";
import Loading from "../mycomponents/Loading";
import { useSingleProduct } from "../context/SingleProduct.Context";

const SingleProduct = () => {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { singleProduct, setSingleProduct } = useSingleProduct();

  const singleProductDetails = async () => {
    setLoading(true);
    try {
      const res = await axios(
        `http://localhost:3000/api/v1/singleproduct/${id}`
      );
      console.log(res);
      setSingleProduct(res.data.getSingleProduct);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    singleProductDetails();
  }, [id]);

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      {singleProduct && (
        <SingleProductCard
          title={singleProduct.name}
          description={singleProduct.description}
          image={singleProduct.image}
          price={singleProduct.price}
          createdAt={singleProduct.createdAt}
          username={singleProduct.createdBy.userName}
        />
      )}
    </>
  );
};

export default SingleProduct;
