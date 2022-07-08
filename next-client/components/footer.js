import styles from "../styles/footer.module.css"
import GitHubIcon from '@mui/icons-material/GitHub';
import ReceiptIcon from '@mui/icons-material/Receipt';

const Footer = ()=>{
    return(
        <footer className={styles.footer}>
            <a href="https://github.com/OmBayus/web3-payment" target="_blank" rel="noreferrer"><GitHubIcon className={styles.icon}/><span>Github</span></a>
            <a href="https://rinkeby.etherscan.io/address/0x7DCC9447b8176ee69dB5303303BE86A38B0a7ddD" target="_blank" rel="noreferrer"><ReceiptIcon className={styles.icon}/><span>Contract Address</span></a>
            <a href="https://www.ombayus.com" target="_blank" rel="noreferrer">© 2022 | Created by OmBayus</a>
        </footer>
    )
}

export default Footer