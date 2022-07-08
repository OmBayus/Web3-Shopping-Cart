import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Container, Grid } from "@mui/material";
import Image from "next/image";
import Hero from "../components/hero"
import { ethers } from "ethers";
import { abi } from "../constants/abi";
import styles from "../styles/order.module.css";
import OrderService from "../services/order";

import Payment from "../components/order/payment";

const Order = ({ query }) => {
  const router = useRouter();

  const [orderData, setOrderData] = useState({
    _id: "",
    products: [],
    email: "",
    isPaid: false,
    receiver: "",
  });

  async function getOrder(order) {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.JsonRpcBatchProvider(
        process.env.NEXT_PUBLIC_RPC_URL
      );
      const contractAddress = process.env.NEXT_PUBLIC_CONTRACT;
      const contract = new ethers.Contract(contractAddress, abi, provider);
      try {
        const result = await contract.getOrder(query.id);
        if (Number(result.toString()) >= order.price) {
          pay("")
          setOrderData({ ...orderData, isPaid: true });
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Please install MetaMask");
    }
  }

  const pay = (receiver) => {
    OrderService.pay(query.id, receiver)
      .then((res) => {
        if (res.data) {
          setOrderData(res.data);
        } else {
          alert("Error");
        }
      })
      .catch((err) => {
        alert("Error");
      });
  };

  useEffect(() => {
    if (!query.id) {
      router.push("/");
    } else {
      OrderService.get(query.id)
        .then((res) => {
          if (res.data) {
            setOrderData(res.data);
            if (!res.data.isPaid) getOrder(res.data);
          } else {
            router.push("/");
          }
        }, [])
        .catch((err) => {
          router.push("/");
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Hero header="Payment" description="Pay with web3 wallet!" />
      <Container>
        <Grid container spacing={3}>
          <Grid item md={6}>
            <div className={styles.card}>
              {!orderData.isPaid ? (<Payment pay={pay} price={orderData.price} id={orderData._id}  styles={styles} />) : ( 
              <div>
                <h1>Payment received.</h1>
              </div>
              )}
              
            </div>
          </Grid>
          <Grid item md={6}>
            <div className={styles.card}>
              <h1>Products</h1>
              <div>
                {orderData.products.map((it) => (
                  <div className={styles.item} key={it.product._id}>
                    <Image
                      src="https://picsum.photos/200"
                      alt="item"
                      width={50}
                      height={50}
                    />
                    <span>{it.product.name}</span>
                    <span>{it.product.price} BNB</span>
                    <span>{it.quantity}</span>
                  </div>
                ))}
              </div>
              <div>
                <h4 className={styles.price}>
                  Price: {orderData.price && Number(orderData.price).toFixed(5)} BNB
                </h4>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

Order.getInitialProps = ({ query }) => {
  return { query };
};

export default Order;
