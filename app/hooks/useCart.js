import { useSelector } from "react-redux";

export default useCart = () => {
  return useSelector((state) => state.cart.cart);
};
