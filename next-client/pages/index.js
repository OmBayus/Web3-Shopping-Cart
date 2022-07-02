import Wallet from "../components/wallet";
import Products from "../components/products";
import Cart from "../components/cart";
import ProductService from "../services/product";

export default function Home({ products }) {
  return (
    <>
      <Products products={products} />
      <Cart />
    </>
  );
}

export async function getStaticProps() {
  try {
    const res = await ProductService.getAll();
    return {
      props: {
        products: res.data || [],
      },
    };
  } catch (err) {
    return {
      props: {
        products: [],
      },
    };
  }
}
