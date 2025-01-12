import React, { useEffect, useState } from "react";

import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import AddOrEditAdForm from "../mycomponents/AddOrEditAdForm";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../mycomponents/Loading";

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
    formState: { errors },
  } = useForm<Inputs>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

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

  // Set form values when product details are fetched
  useEffect(() => {
    if (singleProduct) {
      setLoading(true);
      setValue("name", singleProduct.name || "");
      setValue("description", singleProduct.description || "");
      setValue("price", singleProduct.price || "");
      setValue("image", singleProduct.image || "");
      setLoading(false);
    }
  }, [singleProduct, setValue]); // This runs whenever singleProduct changes

  const [err, setErr] = useState<string>("");
  // Handle form submission
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setErr("");
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("image", data.image[0]);
      const response = await axios.put(
        `http://localhost:3000/api/v1/product/${id}`,
        formData,
        {
          withCredentials: true,
        }
      );
      reset();
      navigate("/myproduct");
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
      />
    </div>
  );
};

export default EditAd;
