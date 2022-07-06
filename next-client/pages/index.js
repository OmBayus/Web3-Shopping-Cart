import Hero from "../components/hero";
import Products from "../components/products";
import Cart from "../components/cart";
import ProductService from "../services/product";

export default function Home({ products }) {
  return (
    <>
      <Hero header="Store" description="Buy with web3 wallet!" />
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
