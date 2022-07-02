import { Container, TextField, Button } from "@mui/material";
import { useState } from "react";
import {useRouter} from "next/router"
import ProductService from "../services/product";

const OwnerPage = () => {
  const router = useRouter()
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
  });

  const handleChange = (event) => {
    setProduct((prevValue) => ({
      ...prevValue,
      [event.target.name]: event.target.value,
    }));
  };

  const Submit = ()=>{
    console.log(product)
    ProductService.add(product)
    .then(res=>{
      alert("Product Added")
    })
    .catch(err=>{
      alert(err.response.data ? err.response.data.message : err.message)
    })
  }

  return (
    <Container>
      <h1>Create new Product</h1>
      <div style={{ marginBottom: 10 }}>
        <TextField label="Name" name="name" variant="outlined" onChange={handleChange} />
      </div>
      <div style={{ marginBottom: 10 }}>
        <TextField label="Price" name="price" variant="outlined" onChange={handleChange} />
      </div>
      <div style={{ marginBottom: 10 }}>
        <TextField
          name="description"
          label="Description"
          variant="outlined"
          onChange={handleChange}
        />
      </div>
      <Button onClick={Submit}>Add</Button>
    </Container>
  );
};

export default OwnerPage;
