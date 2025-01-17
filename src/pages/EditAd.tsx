import { useEffect, useState } from "react";

import { useForm, SubmitHandler } from "react-hook-form";
import AddOrEditAdForm from "../mycomponents/AddOrEditAdForm";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../mycomponents/Loading";
import { api } from "../axios-interceptor/axios";
import { useProducts } from "../context/UserProducts.Context";
import { imageToUrl } from "../firebase/firbaseconfig.js";

type Inputs = {
  name: string;
  description: string;
  price: string;
  image: FileList; // This will hold the profile picture file
};

const EditAd = () => {
  const { id } = useParams();
  const [singleProduct, setSingleProduct] = useState<Inputs | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { products, setProducts } = useProducts();

  const singleProductDetails = async () => {
    setLoading(true);
    try {
      const res = await api.get(`singleproduct/${id}`);
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

  // Set form values when product details are fetched
  useEffect(() => {
    if (singleProduct) {
      setLoading(true);
      setValue("name", singleProduct.name || "");
      setValue("description", singleProduct.description || "");
      setValue("price", singleProduct.price || "");
      setLoading(false);
    }
  }, [singleProduct, setValue]); // This runs whenever singleProduct changes

  const [err, setErr] = useState<string>("");
  // Handle form submission
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setErr("");
      const formData: { [key: string]: string } = {};
      formData.name = data.name;
      formData.description = data.description;
      formData.price = data.price;
      if (data.image[0]) {
        const url = await imageToUrl(data.image[0]);
        formData.image = url;
      }
      console.log(formData);

      const response = await api.put(`product/${id}`, formData);
      if (Array.isArray(products)) {
        const index = products?.findIndex(
          (item) => item._id === response.data.ad._id
        );
        if (index !== -1) {
          console.log(products, index);
          const updatedProducts = [...products]; // Create a shallow copy of the products array
          updatedProducts[index] = response.data.ad; // Update the product at the found index
          setProducts(updatedProducts);
        }
        reset();
        navigate("/myproduct");
      }
    } catch (error) {
      console.log(error);
      // Handle any errors that occur during form submission
      setErr("An error occurred. Please try again.");
    }
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <AddOrEditAdForm
        register={register}
        onSubmit={onSubmit}
        errors={errors}
        handleSubmit={handleSubmit}
        err={err}
        heading={"Edit Product"}
        btnHeading={isSubmitting ? "Editing..." : "Edit"}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default EditAd;
