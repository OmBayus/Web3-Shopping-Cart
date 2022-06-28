import { Container } from "@mui/material";
import ProductCard from "./productCard";
import Grid from "@mui/material/Grid";

export default function Products({products}) {
  return (
    <Container style={{padding:"20px 0"}}>
      <Grid container spacing={2}>
        {products.map((item) => (
          <Grid key={item} item xs={3}>
            <ProductCard {...item} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
