import { useState } from "react";
import { useSelector } from "react-redux";
import TransactionItem from "./TransactionItem/TransactionItem";

const EditTransaction = () => {

    const [open, setOpen] = useState(false);
    
    const {transactions} = useSelector((state) => state.transactions)

    return (
        <nav>
            <button className="modal-btn" onClick={() => setOpen(true)}>
            Редагувати транзакцію
            </button>
            {open ? (
            <div className="overlay">
                <div className="modal">
                {transactions.map((transaction) => {
                    return (
                        <TransactionItem 
                            transaction={transaction} key={transaction.id}
                            />
                    );
                })}
    
                <button className="modal-close" onClick={() => setOpen(false)}>X</button>
                </div>
            </div>
            ) : null}
        </nav>
    );
};

export default EditTransaction;