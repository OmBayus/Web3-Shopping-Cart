import React from "react";
import { useRouter } from "next/router";
import OrderService from "../services/order";

function Profil({ query }) {
  const router = useRouter();
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    if (!query.address) {
      router.push("/");
    } else {
      OrderService.getByAddress(query.address)
        .then((res) => {
          if (res.data) {
            setData(res.data);
          }
        }, [])
        .catch((err) => {
          alert("Error");
          router.push("/");
        });
    }
  }, []);

  return <div>{JSON.stringify(data)}</div>;
}

Profil.getInitialProps = ({ query }) => {
  return { query };
};

export default Profil;
