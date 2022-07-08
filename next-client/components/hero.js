import {Zoom} from "react-awesome-reveal";
import styles from "../styles/hero.module.css";

export default function Hero({header,description}){
  return (
    <div className={styles.hero}>
      <Zoom>
        <div>
          <h3>{header}</h3>
          <span>{description}</span>
        </div>
      </Zoom>
    </div>
  );
};