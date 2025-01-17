import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { api } from "../axios-interceptor/axios";
import { imageToUrl } from "../firebase/firbaseconfig.js";
import AddOrEditAdForm from "../mycomponents/AddOrEditAdForm.js";

type Inputs = {
  name: string;
  description: string;
  price: string;
  image: FileList; // This will hold the profile picture file
};

const AddProduct = () => {
  const [err, setErr] = useState<string>("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  // Handle form submission
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setErr("");
      const formData: { [key: string]: string } = {};
      formData.name = data.name;
      formData.description = data.description;
      formData.price = data.price;
      const url = await imageToUrl(data.image[0]);
      formData.image = url;
      const response = await api.post("createproduct", formData);
      navigate("/myproduct");
    } catch (error) {
      console.log(error);
      // Handle any errors that occur during form submission
      setErr("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <AddOrEditAdForm
        register={register}
        onSubmit={onSubmit}
        errors={errors}
        handleSubmit={handleSubmit}
        err={err}
        heading={"Add Product"}
        btnHeading={isSubmitting ? "Adding Product..." : "Add Product"}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default AddProduct;
