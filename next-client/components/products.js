import { Button, Container } from "@mui/material";
import ProductCard from "./productCard";
import Grid from "@mui/material/Grid";
import { useSelector, useDispatch } from 'react-redux'
import {add } from "../reducers/cart"

export default function Products({products}) {
  const cart = useSelector(state => state.cart.value)
  const dispatch = useDispatch()

  const addToCart = (id) =>{
    dispatch(add({product:id}))
  }
  return (
    <Container style={{padding:"20px 0"}}>
      <Grid container spacing={2}>
        {products.map((item) => (
          <Grid key={item._id} item xs={3}>
            <ProductCard {...item} add={()=>addToCart(item._id)} />
          </Grid>
        ))}
      </Grid>
      <p>{JSON.stringify(cart)}</p>
    </Container>
  );
}
