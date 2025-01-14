import { MinusIcon, PlusIcon } from "lucide-react";
import { useCart } from "../context/Cart.context";
import { Button } from "../components/ui/button";

interface itemQuantity {
  quantity: number;
  index: number;
}

const AddOrDecreaseBtns = ({ quantity, index }: itemQuantity) => {
  const { cart, updateCart } = useCart();
  const increseQuantity = () => {
    updateCart(index, "increase");
    localStorage.setItem("cart", JSON.stringify(cart));
  };
  const decreaseQuantity = () => {
    updateCart(index, "decrease");
    localStorage.setItem("cart", JSON.stringify(cart));
  };
  return (
    <>
      <div className="flex items-center gap-4">
        <Button
          onClick={decreaseQuantity}
          className="border-2 border-black bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <MinusIcon className="w-4 h-4" />
        </Button>
        <span className="text-xl font-medium text-black">{quantity}</span>
        <Button
          onClick={increseQuantity}
          className="border-2 border-black bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <PlusIcon className="w-4 h-4" />
        </Button>
      </div>
    </>
  );
};

export default AddOrDecreaseBtns;
