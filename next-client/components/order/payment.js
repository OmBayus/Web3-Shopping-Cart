import { Button } from "@mui/material";

const Payment = ({ styles }) => {
  return (
    <>
      <h1>Connect Wallet</h1>
      <div style={{ marginBottom: "1em" }}>
        <Button className={styles.btn}>Conenct Wallet</Button>
      </div>
    </>
  );
};
export default Payment;
