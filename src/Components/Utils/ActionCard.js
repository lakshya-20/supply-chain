import styles from "../Styles/actionCard.module.css";
const ActionCard = ({actionItem=undefined, setActionItem=undefined, navigationHandle=undefined}) =>{
    
    return (
        <span 
            className = {`${styles.cardBox} col-5 col-sm-2 col-md-2 m-1`}
            onClick = { setActionItem ? setActionItem : navigationHandle} 
        >
            {actionItem}
        </span>
    )
}
export default ActionCard;