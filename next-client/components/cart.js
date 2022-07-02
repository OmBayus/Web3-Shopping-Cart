import { Button, Container, TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import OrderService from "../services/order";
import { clear } from "../reducers/cart";
import { useState } from "react";

export default function Cart() {
  const cart = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");

  const router = useRouter();

  const pay = () => {
    if (email) {
      OrderService.create({ products:cart.products, email })
        .then((res) => {
            router.push("/order?id=" + res.data._id);
        })
        .catch((err) => {
          alert("Error");
        });
    }
  };

  const clearCart = () => {
    dispatch(clear());
  };

  return (
    <Container style={{ padding: "20px 0" }}>
      <p>{JSON.stringify(cart)}</p>
      <TextField
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button onClick={pay}>Pay</Button>
      <Button color="warning" onClick={clearCart}>
        Clear
      </Button>
    </Container>
  );
}
