import { useEffect,useState } from "react";
import Hero from "../components/hero";
import Products from "../components/products";
import StoreCart from "../components/storeCart";
import ProductService from "../services/product";

export default function Home({ staticProducts }) {
  const [products, setProducts] = useState(staticProducts)
  const getProducts = async () => {
    try {
      const res = await ProductService.getAll();
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(()=>{
    getProducts()
  },[])
  return (
    <>
      <Hero header="Store" description="Buy with web3 wallet!" />
      <Products products={products} />
      <StoreCart />
    </>
  );
}

export async function getStaticProps() {
  try {
    const res = await ProductService.getAll();
    return {
      props: {
        staticProducts: res.data || [],
      },
    };
  } catch (err) {
    return {
      props: {
        staticProducts: [],
      },
    };
  }
}
