import { Container, TextField, Button } from "@mui/material";
import { useState } from "react";
import ProductService from "../services/product";

const OwnerPage = () => {
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
    ProductService.add(product)
    .then(res=>{
        console.log(res)
    })
    .catch(errr=>{})
  }

  return (
    <Container>
      <h1>Create new Product</h1>
      <div style={{ marginBottom: 10 }}>
        <TextField label="Name" variant="outlined" onChange={handleChange} />
      </div>
      <div style={{ marginBottom: 10 }}>
        <TextField label="Price" variant="outlined" onChange={handleChange} />
      </div>
      <div style={{ marginBottom: 10 }}>
        <TextField
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
