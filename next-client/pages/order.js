import AppBar from "../components/appbar";
const Order = ({ query }) => {
  console.log(query);
  return (
    <>
      <AppBar />
    </>
  );
};

Order.getInitialProps = ({ query }) => {
  return { query };
};

export default Order;
