import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const AddTransaction = ({getTransactions}) => {
    const [open, setOpen] = useState(false);
    const [transactionName, setTransactionName] = useState('');
    const [transactionValue, setTransactionValue] = useState(0);
    const [transactionCategory, setTransactionCategory] = useState('');
    const [transactionDate, setTransactionDate] = useState('');

    let today = new Date();
    let year = today.getFullYear();
    let month = ('0' + (today.getMonth() + 1)).slice(-2);
    let day = ('0' + today.getDate()).slice(-2);
    let formattedDate = year + '-' + month + '-' + day;

    const createObj = async() => {

        try {
            const obj = {
                "id": `${uuidv4()}`,
                "name": `${transactionName}`,
                "value": `${transactionValue}`,
                "category": `${transactionCategory}`,
                "date": `${transactionDate}`
            }

            await fetch('http://localhost:3001/transactions', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(obj),
            });
            
            await getTransactions();

        } catch (error) {
        console.error('Помилка при виконанні POST-запиту:', error);
        }
    }
    
    return (
        <nav>
            <button className="modal-btn" onClick={() => setOpen(true)}>Нова транзакція</button>
            {open ? <div className="overlay">
                <div className="modal">
                    
                    <label htmlFor='name'>Назва транзакції:</label>
                    <input 
                        type="text" 
                        name='name' 
                        value={transactionName} 
                        onChange={e => setTransactionName(e.target.value)}
                        placeholder='Введіть назву транзакції'/>

                    <label htmlFor='category'>Категорія:</label>
                    <input 
                        type="text" 
                        name='category' 
                        value={transactionCategory} 
                        onChange={e => setTransactionCategory(e.target.value)}
                        placeholder='Введіть назву категорії'/>
                    
                    <label htmlFor='value'>Значення:</label>
                    <input 
                        type="number" 
                        name='value' 
                        value={transactionValue} 
                        onClick={() => {
                            transactionValue === 0 ? setTransactionValue('') : setTransactionValue(transactionValue)
                        }}
                        onChange={e => setTransactionValue(e.target.value)}
                        placeholder='Введіть ліміт коштів'/>

                    <label htmlFor='date'>Дата:</label>
                    <input 
                        type="date" 
                        name='date' 
                        value={transactionDate}
                        onClick={() => transactionDate === '' ? setTransactionDate(formattedDate) : transactionDate}
                        onChange={e => setTransactionDate(e.target.value)}
                        />

                    <button type='submit' onClick={e => {
                        e.preventDefault();
                        createObj();

                        }
                    }>Додати</button>

                    <button className='modal-close' onClick={() => setOpen(false)}>X</button>
                </div>
            </div> : null}
        </nav>  
    )
}

export default AddTransaction;