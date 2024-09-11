import axios from "axios";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import toast from "react-hot-toast";
import { serverurl } from "../Config/baseurl";

export interface Product {
  _id: string;
  title: string;
  price: number;
  discountedPrice: number;
  description: string;
  images: string[];
  categories: string[];
  discount: number;
  rating: number;
}

interface ProductContextType {
  products: Product[];
  productDetails: Product | null;
  getProducts: () => void;
  getProductDetails: (productId: string) => void;
  productsLoading: boolean;
  productDetailsLoading: boolean;
  productsError: string | null;
  productDetailsError: string | null;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Products state
  const [products, setProducts] = useState<Product[]>([]);
  const [productDetails, setProductDetails] = useState<Product | null>(null);

  // Loading and error states for products and product details
  const [productsLoading, setProductsLoading] = useState(false);
  const [productDetailsLoading, setProductDetailsLoading] = useState(false);
  const [productsError, setProductsError] = useState<string | null>(null);
  const [productDetailsError, setProductDetailsError] = useState<string | null>(
    null
  );

  // Fetch all products
  const getProducts = async () => {
    setProductsLoading(true);
    setProductsError(null);
    try {
      const response = await axios.get(`${serverurl}/product`);
      setProducts(response.data.products);
    } catch (err: any) {
      setProductsError(
        err.response?.data?.message || "Failed to fetch products"
      );
      toast.error(err.response?.data?.message || "Failed to fetch products");
    } finally {
      setProductsLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // Fetch product details by product ID
  const getProductDetails = async (productId: string) => {
    setProductDetailsLoading(true);
    setProductDetailsError(null);
    try {
      const response = await axios.get(`${serverurl}/product/${productId}`);
      setProductDetails(response.data.product);
    } catch (err: any) {
      setProductDetailsError(
        err.response?.data?.message || "Failed to fetch product details"
      );
      toast.error(
        err.response?.data?.message || "Failed to fetch product details"
      );
    } finally {
      setProductDetailsLoading(false);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        productDetails,
        getProducts,
        getProductDetails,
        productsLoading,
        productDetailsLoading,
        productsError,
        productDetailsError,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};
