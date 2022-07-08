/* eslint-disable @next/next/no-img-element */
import Web3Modal from "web3modal";
import { useEffect } from "react";
import { ethers } from "ethers";
import { useSelector, useDispatch } from "react-redux";
import WalletConnectProvider from "@walletconnect/web3-provider";
import NextLink from "next/link";
import { connect, disconnect } from "../reducers/wallet";
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
  const dispatch = useDispatch();
  const wallet = useSelector((state) => state.wallet.value);

  useEffect(() => {
    web3Modal = new Web3Modal({
      cacheProvider: false,
      providerOptions, // required
    });
  }, []);

  useEffect(() => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );
      provider.on("network", async (newNetwork, oldNetwork) => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        dispatch(
          connect({ chainId: newNetwork.chainId, signer: provider.getSigner() })
        );
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function Connect() {
    try {
      if (typeof window.ethereum !== "undefined") {
        const web3ModalProvider = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(web3ModalProvider);
        const { chainId } = await provider.getNetwork();
        dispatch(connect({ chainId, signer: provider.getSigner() }));
      } else {
        const provider = await web3Modal.connectTo("walletconnect");
        const { chainId } = await provider.getNetwork();
        dispatch(connect({ chainId, signer: provider.getSigner() }));
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function Disconnect() {
    dispatch(disconnect());
    await web3Modal.clearCachedProvider();
  }

  // const setupNetwork = async () => {
  //   const provider = window.ethereum;
  //   if (provider) {
  //     try {
  //       await provider.request({
  //         method: "wallet_addEthereumChain",
  //         params: [
  //           {
  //             chainId: 4,
  //             chainName: "Ethereum Testnet Rinkeby",
  //             nativeCurrency: {
  //               name: "RinkebyETH",
  //               symbol: "RIN",
  //               decimals: 18,
  //             },
  //             rpcUrls: ["https://rpc.ankr.com/eth_rinkeby","https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"],
  //             blockExplorerUrls: ["https://rinkeby.etherscan.io"],
  //           },
  //         ],
  //       });
  //       return true;
  //     } catch (error) {
  //       console.error("Failed to setup the network in Metamask:", error);
  //       return false;
  //     }
  //   } else {
  //     console.error(
  //       "Can't setup the BSC network on metamask because window.ethereum is undefined"
  //     );
  //     return false;
  //   }
  // };

  async function wrongNetwork() {
    Disconnect();
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
        {!wallet.connected && (
          <button className={styles.connectBtn} onClick={Connect}>
            Connect Wallet
          </button>
        )}
        {wallet.connected && wallet.chainId === 4 && (
          <button
            className={styles.connectBtn}
            style={{ background: "#FF5525" }}
            onClick={Disconnect}
          >
            Disconnect
          </button>
        )}
        {wallet.connected && wallet.chainId !== 4 && (
          <button
            className={styles.connectBtn}
            style={{ background: "red" }}
            onClick={wrongNetwork}
          >
            Wrong Network
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
