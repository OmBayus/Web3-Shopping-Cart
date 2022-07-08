import React from "react";
import { Button, IconButton } from "@mui/material";
import Image from 'next/image'
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { remove } from "../reducers/cart";
import { useState } from "react";
import styles from "../styles/store.cart.module.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Slide from "@mui/material/Slide";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';

export default function StoreCart() {
  const cart = useSelector((state) => state.cart.value);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const router = useRouter();

  const Remove = (id,price)=>{
    dispatch(remove({product:id,price}));
  }

  return (
    <div>
      {!show && (
        <div className={styles.cartBtn} onClick={() => setShow(true)}>
          <ShoppingCartIcon />
          {cart.products.length !== 0 && <span>{cart.products.length}</span>}
        </div>
      )}
      {show && (
        <div className={styles.cartScreen} onClick={() => setShow(false)}></div>
      )}
      <Slide direction="left" in={show}>
        <div className={styles.cart}>
          <IconButton
            aria-label="close"
            color="warning"
            className={styles.close}
            onClick={() => setShow(false)}
          >
            <ClearIcon />
          </IconButton>
          <h1>Cart</h1>
          <div className={styles.items}>
            {cart.products.map((it) => (
              <div className={styles.item} key={it.product}>
                <Image src="https://picsum.photos/200" alt="item" width={50} height={50} />
                <span>{it.data.name}</span>
                <span>{it.data.price} BNB</span>
                <span>{it.quantity}</span>
                {it.quantity === 1 ? <IconButton
                  aria-label="delete"
                  onClick={()=>Remove(it.product,it.data.price)}
                >
                  <DeleteIcon />
                </IconButton> : <IconButton
                  aria-label="delete"
                  onClick={()=>Remove(it.product,it.data.price)}
                >
                  <RemoveIcon />
                </IconButton>}
              </div>
            ))}
          </div>
          <div>
            <h4 className={styles.price}>Price: {cart.price.toFixed(5)} BNB</h4>
            <Button
              className={styles.buyBtn}
              color="success"
              variant="contained"
              onClick={()=>router.push("/cart")}
            >
              Buy
            </Button>
          </div>
        </div>
      </Slide>
    </div>
  );
}
