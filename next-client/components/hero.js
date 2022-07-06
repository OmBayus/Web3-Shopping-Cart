import Zoom from 'react-reveal/Zoom';
import styles from "../styles/hero.module.css";

const Hero = ({header,description}) => {
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

export default Hero;
