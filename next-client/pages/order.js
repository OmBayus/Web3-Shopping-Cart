import AppBar from "../components/appbar";
import {useRouter} from "next/router"
import { useEffect,useState } from "react";
import OrderService from "../services/order"
import { Button } from "@mui/material";
const Order = ({ query }) => {
  const router = useRouter()

  const [orderData,setOrderData] = useState({
    _id:"",
    product:"",
    email:"",
    isPaid:false
  })

  useEffect(()=>{
    if(!query.id){
      router.push("/")
    }else{
      OrderService.get(query.id)
      .then(res=>{
        if(res.data){
          setOrderData(res.data)
        }
        else{
          router.push("/")
        }
      },[])
      .catch((err)=>{
        alert("Error")
        router.push("/")
      })
    }
  },[])

  const pay = ()=>{
    OrderService.pay(query.id)
    .then(res=>{
      if(res.data){
        setOrderData(res.data)
      }
      else{
        alert("Error")
      }
    })
    .catch(err=>{
      alert("Error")
    })
  }

  if(orderData.isPaid){
    return(<div>
      <AppBar />
      <div>
        Paid
      </div>
    </div>)
  }
  return (
    <>
      <AppBar />
      <Button onClick={pay}>Pay</Button>
    </>
  );
};

Order.getInitialProps = ({ query }) => {
  return { query };
};

export default Order;
