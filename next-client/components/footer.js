import styles from "../styles/footer.module.css"
import GitHubIcon from '@mui/icons-material/GitHub';
import ReceiptIcon from '@mui/icons-material/Receipt';

const Footer = ()=>{
    return(
        <footer className={styles.footer}>
            <a href="https://github.com/OmBayus/Web3-Shopping-Cart" target="_blank" rel="noreferrer"><GitHubIcon className={styles.icon}/><span>Github</span></a>
            <a href="https://bscscan.com/address/0x2fF7aDa379712E772c9A8F0eb37C836Ded11006E" target="_blank" rel="noreferrer"><ReceiptIcon className={styles.icon}/><span>Contract Address</span></a>
            <a href="https://www.ombayus.com" target="_blank" rel="noreferrer">© 2022 | Created by OmBayus</a>
        </footer>
    )
}

export default Footer
