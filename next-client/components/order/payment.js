import Wallet from "../../components/wallet"


const Payment = ({query,price,pay})=>{


    return(
        <div>
            <h1>Payment</h1>
            <h3>{price}</h3>
            <Wallet query={query} pay={pay} price={price}/>
        </div>
    )
}
export default Payment
