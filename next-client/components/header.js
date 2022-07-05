/* eslint-disable @next/next/no-img-element */
import Web3Modal from "web3modal";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { abi } from "../constants/abi";
import WalletConnectProvider from "@walletconnect/web3-provider";
import NextLink from "next/link";
import styles from "../styles/header.module.css";

let web3Modal;

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      rpc: { 4: process.env.NEXT_PUBLIC_RPC_URL }, // required
    },
  },
};

const Header = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [signer, setSigner] = useState(undefined);
  const [chainId, setChainId] = useState(undefined);

  useEffect(()=>{
    web3Modal = new Web3Modal({
      cacheProvider: false,
      providerOptions, // required
    });
  },[])

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    provider.on("network", (newNetwork, oldNetwork) => {
      setChainId(newNetwork.chainId);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setSigner(provider.getSigner());
    });
  }, []);

  async function connect() {
    if (typeof window.ethereum !== "undefined") {
      try {
        const web3ModalProvider = await web3Modal.connect();
        setIsConnected(true);
        const provider = new ethers.providers.Web3Provider(web3ModalProvider);
        setSigner(provider.getSigner());
        const { chainId } = await provider.getNetwork();
        setChainId(chainId);
      } catch (e) {
        console.log(e);
      }
    } else {
      setIsConnected(false);
    }
  }

  async function disconnect() {
    setSigner(undefined);
    setIsConnected(false);
    await web3Modal.clearCachedProvider();
  }
  return (
    <header className={styles.header}>
      <div style={{ display: "flex" }}>
        <NextLink href="/">
          <div className={styles.logo}>
            <span className="hidden md:flex">Web3 Shopping Cart</span>
          </div>
        </NextLink>
      </div>
      <div style={{ flex: "none" }}>
        {!isConnected && (
          <button className={styles.connectBtn} onClick={connect}>
            Connect Wallet
          </button>
        )}
        {isConnected && chainId === 4 && (
          <button
            className={styles.connectBtn}
            style={{ background: "#FF5525" }}
            onClick={disconnect}
          >
            Disconnect
          </button>
        )}
        {isConnected && chainId !== 4 && (
          <button
            className={styles.connectBtn}
            style={{ background: "red" }}
            onClick={disconnect}
          >
            Wrong Network
          </button>
        )}
      </div>
      {/* <button
        onClick={async () => {
          if (isConnected) {
            const contractAddress = process.env.NEXT_PUBLIC_CONTRACT;
            const contract = new ethers.Contract(contractAddress, abi, signer);
            const result = await contract.getOrder("asd");
            console.log(result);
          }
        }}
      >
        tikla
      </button> */}
    </header>
  );
};

export default Header;
