import { Button, Container } from "@mui/material";
import ProductCard from "./productCard";
import Grid from "@mui/material/Grid";
import { useDispatch } from 'react-redux'
import {add } from "../reducers/cart"

export default function Products({products}) {
  const dispatch = useDispatch()

  const addToCart = (id) =>{
    dispatch(add({product:id, price:products.find(it=>it._id===id).price}))
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
    </Container>
  );
}
