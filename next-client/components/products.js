import { Button, Container } from "@mui/material";
import ProductCard from "./productCard";
import Grid from "@mui/material/Grid";
import { useDispatch } from 'react-redux'
import {add} from "../reducers/cart"

export default function Products({products}) {
  const dispatch = useDispatch()

  const addToCart = (id,item) =>{
    dispatch(add({product:id,data:item, price:products.find(it=>it._id===id).price}))
  }
  return (
    <Container >
      <Grid container spacing={2} className="card-md-dis">
        {products.map((item) => (
          <Grid key={item._id} item md={4}>
            <ProductCard {...item} add={()=>addToCart(item._id,item)} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
