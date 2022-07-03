import {useRouter} from "next/router"
import { useEffect,useState } from "react";
import { ethers } from "ethers";
import { abi } from "../constants/abi";
import OrderService from "../services/order"

import Payment from "../components/order/payment";


const Order = ({ query }) => {
  const router = useRouter()

  const [orderData,setOrderData] = useState({
    _id:"",
    product:"",
    email:"",
    isPaid:false
  })

  async function getOrder(order) {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.JsonRpcBatchProvider(process.env.NEXT_PUBLIC_RPC_URL)
      const contractAddress = process.env.NEXT_PUBLIC_CONTRACT;
      const contract = new ethers.Contract(contractAddress, abi,provider);
      try {
        const result = await contract.getOrder(query.id);
        if(Number(result.toString()) >= order.price){
          setOrderData({...orderData,isPaid:true})
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Please install MetaMask");
    }
  }

  const pay = (receiver)=>{
    OrderService.pay(query.id,receiver)
    .then(res=>{
      if(res.data){
        console.log(res.data)
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

  useEffect(()=>{
    if(!query.id){
      router.push("/")
    }else{
      OrderService.get(query.id)
      .then(res=>{
        if(res.data){
          setOrderData(res.data)
          if(!res.data.isPaid)
            getOrder(res.data)
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

 

  if(orderData.isPaid){
    return(<div>
      <div>
        Paid
      </div>
    </div>)
  }
  return (
    <>
      <Payment setOrderData={setOrderData} query={query} price={orderData.price} pay={pay} />
      
    </>
  );
};

Order.getInitialProps = ({ query }) => {
  return { query };
};

export default Order;
