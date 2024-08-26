import { toast } from "react-toastify";

export const Renderprice = (price) => {
  try {
    const result = price.toLocaleString().replaceAll(",", ".");
    return result;
  } catch (error) {
    toast.error(error);
  }
};
