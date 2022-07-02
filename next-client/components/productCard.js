import * as React from 'react';
import {useRouter} from "next/router"
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import OrderService from "../services/order"

export default function BasicCard({_id,name,price,description,add}) {

  const router = useRouter()

  const buy = ()=>{
    const email = prompt("email")

    if(email){
      OrderService.create({product:_id,email})
      .then(res=>{
        router.push("/order?id="+res.data._id)
      })
      .catch(err=>{
        alert("Error")
      })

    }
  }

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          $ {price}
        </Typography>
        <Typography variant="body2">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={add}>Add</Button>
      </CardActions>
    </Card>
  );
}
