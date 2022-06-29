import { Button } from "@mui/material";
import OrderService from "../../services/order"
import Wallet from "../../components/wallet"


const Payment = ({setOrderData,query})=>{

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

    return(
        <div>
            <h1>Payment</h1>
            <Wallet query={query} pay={pay}/>
        </div>
    )
}
export default Payment
