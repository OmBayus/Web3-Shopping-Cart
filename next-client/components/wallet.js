import Web3Modal from "web3modal";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { abi } from "../constants/abi";
import { Button } from "@mui/material";

let web3Modal;

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      rpc: { 4: process.env.NEXT_PUBLIC_RPC_URL }, // required
    },
  },
};

if (typeof window !== "undefined") {
  web3Modal = new Web3Modal({
    cacheProvider: false,
    providerOptions, // required
  });
}

export default function Wallet({query,pay,price}) {
  const [isConnected, setIsConnected] = useState(false);
  const [hasMetamask, setHasMetamask] = useState(false);
  const [signer, setSigner] = useState(undefined);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setHasMetamask(true);
    }
  });

  async function connect() {
    if (typeof window.ethereum !== "undefined") {
      try {
        const web3ModalProvider = await web3Modal.connect();
        setIsConnected(true);
        const provider = new ethers.providers.Web3Provider(web3ModalProvider);
        setSigner(provider.getSigner());
      } catch (e) {
        console.log(e);
      }
    } else {
      setIsConnected(false);
    }
  }

  async function execute() {
    if (typeof window.ethereum !== "undefined") {
      const contractAddress = process.env.NEXT_PUBLIC_CONTRACT;
      const contract = new ethers.Contract(contractAddress, abi, signer);
      try {
        const tx = await contract.pay(query.id,{value:ethers.utils.parseEther(price.toString())});
        await tx.wait();
        const result = await contract.getOrder(query.id);
        if(Number(result.toString()) >= Number(ethers.utils.parseEther(price.toString()))){
          const reciever = await signer.getAddress()
          pay(reciever)
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Please install MetaMask");
    }
  }

  return (
    <div>
      {hasMetamask ? (
        isConnected ? (
          "Connected! "
        ) : (
          <Button onClick={() => connect()}>Connect</Button>
        )
      ) : (
        "Please install metamask"
      )}

      {isConnected ? <Button onClick={() => execute()}>Pay</Button> : ""}
    </div>
  );
}
