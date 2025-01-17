import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import Swal from "sweetalert2";
import { api } from "../axios-interceptor/axios";
import { useProducts } from "../context/UserProducts.Context";

const ProductCard = ({ name, price, image, showBtn, id }: any) => {
  const navigate = useNavigate();
  const { products, setProducts } = useProducts();

  const handleEdit = () => {
    navigate(`/edit/${id}`); // Navigate to the edit page when Edit button is clicked
  };

  const deleteAd = async () => {
    // Show a confirmation dialog
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    const index = products?.findIndex(
      (item) => item._id.toString() === id.toString()
    );

    if (result.isConfirmed) {
      try {
        // Send delete request to API
        const res = await api.delete(`deleteproduct/${id}`);
        console.log(res);

        if (index !== -1 && products) {
          // Create a new array without the item at the given index
          const updatedProducts = products.filter(
            (item) => item._id.toString() !== id.toString()
          );

          // Update state with the new array
          setProducts(updatedProducts);
        }
        // Show a success message after successful deletion
        Swal.fire("Deleted!", "Your product has been deleted.", "success");
      } catch (error) {
        console.log(error);
        // Show an error message if the deletion fails
        Swal.fire("Error", "Something went wrong. Please try again.", "error");
      }
    }
  };
  return (
    <Card
      key={id}
      className="w-[300px] h-fit cursor-pointer rounded-lg overflow-hidden bg-white dark:bg-black"
      style={{
        boxShadow:
          "0 10px 15px -3px rgba(0, 0, 0, .1), 0 4px 6px -2px rgba(0, 0, 0, .25)",
      }}
    >
      {/* Use Link to navigate to the product details page */}
      <Link to={`/product/${id}`}>
        <CardHeader className="pt-4 bg-[#bfd2fa] dark:bg-gray-600">
          <img
            className="h-[220px] object-cover"
            src={
              image ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTybOdiTEGBjvd8S-Rki314WQY5mQhzCQ-tv8p63BaJJ4Ko8p6YU6blXFc&s"
            }
            alt={name}
          />
        </CardHeader>
      </Link>

      <CardTitle className="pt-4 pb-2 px-6 text-black dark:text-white">
        <h4 style={{ fontWeight: 800, letterSpacing: 2 }}>
          {name || "HeadPhone"}
        </h4>
      </CardTitle>
      <CardContent className="pb-4 px-6 text-black dark:text-white">
        <p
          className="text-blue-600 font-semibold dark:text-blue-300"
          style={{ letterSpacing: 2 }}
        >
          Price: <strong className="font-extrabold"> {price || "4000"}</strong>
        </p>
      </CardContent>

      {/* Show Edit and Delete buttons conditionally */}
      {showBtn && (
        <CardFooter className="flex gap-3">
          {/* Edit Button */}
          <div onClick={handleEdit}>
            <Button className="text-white bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800">
              Edit
            </Button>
          </div>
          {/* Delete Button */}
          <Button
            className="text-white bg-red-500 hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800"
            onClick={deleteAd}
          >
            Delete
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default ProductCard;
