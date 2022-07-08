import Image from "next/image";
import { Grid, Container, TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { LoadingButton } from "@mui/lab";
import { useState, useEffect } from "react";
import OrderService from "../services/order";
import { clear } from "../reducers/cart";
import { useRouter } from "next/router";
import styles from "../styles/cart.module.css";
import Hero from "../components/hero";

const CartPage = () => {
  const cart = useSelector((state) => state.cart.value);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (cart.products.length === 0) router.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clearCart = () => {
    dispatch(clear());
  };

  const buy = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (email) {
      await OrderService.create({ products: cart.products, email })
        .then((res) => {
          router.push("/order?id=" + res.data._id);
        })
        .catch((err) => {
          console.log(err);
          alert("Error");
        });
    }
    setLoading(false);
    clearCart();
  };

  return (
    <>
      <Hero header="Cart" description="Enter Your Information" />
      <Container>
        <Grid container spacing={3}>
          <Grid item md={6}>
            <div className={styles.card}>
              <h1>Information</h1>
              <form onSubmit={buy}>
                <div>
                  <TextField
                    label="Email"
                    variant="outlined"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ width: "70%", minWidth: "300px" }}
                  />
                </div>
                <div style={{ padding: "3em 0 1em 0", textAlign: "right" }}>
                  <LoadingButton
                    variant="contained"
                    type="submit"
                    style={{ borderRadius: "12px" }}
                    className={!loading ? styles.btn : {}}
                    loading={loading}
                  >
                    Pay
                  </LoadingButton>
                </div>
              </form>
            </div>
          </Grid>
          <Grid item md={6}>
            <div className={styles.card}>
              <h1>Products</h1>
              <div>
                {cart.products.map((it) => (
                  <div className={styles.item} key={it.product}>
                    <Image
                      src="https://picsum.photos/200"
                      alt="item"
                      width={50}
                      height={50}
                    />
                    <span>{it.data.name}</span>
                    <span>{it.data.price} BNB</span>
                    <span>{it.quantity}</span>
                  </div>
                ))}
              </div>
              <div>
                <h4 className={styles.price}>
                  Price: {cart.price.toFixed(5)} BNB
                </h4>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default CartPage;
