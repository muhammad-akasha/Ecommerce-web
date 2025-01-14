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

const ProductCard = ({ name, price, image, showBtn, id }: any) => {
  const navigate = useNavigate();

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

    if (result.isConfirmed) {
      try {
        // Send delete request to API
        const res = await api.delete(`deleteproduct/${id}`);
        console.log(res);

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
      className="w-[300px] h-fit cursor-pointer shadow-md shadow-zinc-400"
    >
      {/* Use Link to navigate to the product details page */}
      <Link to={`/product/${id}`}>
        <CardHeader className="pt-4 pb-2 px-6">
          <img
            className="h-[220px] object-cover"
            src={
              image ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTybOdiTEGBjvd8S-Rki314WQY5mQhzCQ-tv8p63BaJJ4Ko8p6YU6blXFc&s"
            }
            alt={name}
          />
          <CardTitle className="pt-3">
            <h4 style={{ fontWeight: 700, letterSpacing: 2 }}>
              {name || "HeadPhone"}
            </h4>
          </CardTitle>
        </CardHeader>
      </Link>

      <CardContent className="pb-4 px-6">
        <p className="text-orange-500 font-extrabold">
          Price: {price || "4000"}
        </p>
      </CardContent>

      {/* Show Edit and Delete buttons conditionally */}
      {showBtn && (
        <CardFooter className="flex gap-3">
          {/* Edit Button */}
          <div onClick={handleEdit}>
            <Button>Edit</Button>
          </div>
          {/* Delete Button */}
          <Button onClick={deleteAd}>Delete</Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default ProductCard;
