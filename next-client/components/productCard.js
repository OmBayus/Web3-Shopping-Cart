import * as React from "react";
import { useRouter } from "next/router";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styles from "../styles/productCard.module.css";

export default function BasicCard({ _id, name, price, description, add }) {
  return (
    <Card sx={{ minWidth: 275, maxWidth:350, borderRadius: "10px" }}>
      <div className={styles.cardImage}>
        <img src="https://img.freepik.com/free-vector/hand-putting-golden-coin-donation-box-donate-concept-charity-share-illustration-flat-style_256722-27.jpg?w=2000" alt="product" />
      </div>
      <CardContent sx={{textAlign: 'center'}}>
        <Typography variant="h5" component="div" sx={{mb: 1.5}}>
          {name}
        </Typography>
        <Typography sx={{ mb: 1.5,fontSize:"2em",fontWeight: "800",lineHeight:1 }}>
        {price} BNB
        </Typography>
        <Typography variant="body2" sx={{mb: 1.5}} color="text.secondary">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button className={styles.cardBtn} variant="contained" onClick={add}>
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}
