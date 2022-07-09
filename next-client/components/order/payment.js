import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { abi } from "../../constants/abi";
import { LoadingButton } from "@mui/lab";
import { ethers } from "ethers";
import { useState } from "react";

const Payment = ({ styles, pay, id, price }) => {
  const wallet = useSelector((state) => state.wallet.value);
  const [loading,setLoading] = useState(false);
  async function execute() {
    setLoading(true)
    if (typeof window.ethereum !== "undefined") {
      const contractAddress = process.env.NEXT_PUBLIC_CONTRACT;
      const contract = new ethers.Contract(contractAddress, abi, wallet.signer);
      try {
        const tx = await contract.pay(id,{value:ethers.utils.parseEther(price.toString())});
        await tx.wait();
        const result = await contract.getOrder(id);
        if(Number(result.toString()) >= Number(ethers.utils.parseEther(price.toString()))){
          const reciever = await wallet.signer.getAddress()
          pay(reciever,setLoading)
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Please install MetaMask");
    }
    // setLoading(false)
  }

  return (
    <>
      <h1>{wallet.connected ? wallet.chainId.toString() === process.env.NEXT_PUBLIC_CHAIN ? "Pay with web3!":"Wrong Network": "Connect Wallet" }</h1>
      <div style={{ marginBottom: "1em" }}>
        {(wallet.connected && wallet.chainId.toString() === process.env.NEXT_PUBLIC_CHAIN) && <LoadingButton 
          loading={loading} 
          className={!loading ? styles.btn:{}} 
          variant="contained"
          type="submit" 
          style={{ borderRadius: "12px",width: "80%",}} 
          onClick={execute}>Pay</LoadingButton>}
        </div>
    </>
  );
};
export default Payment;
