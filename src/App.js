import React, { useEffect, useState, useTransition } from 'react';
import CategoryList from './components/CategoryList/CategoryList';
import TransactionsList from './components/TransactionsList/TransactionsList';
import { v4 as uuidv4 } from 'uuid';
import { setCategories } from './store/reducers/categoriesSlice';
import { setTransactions } from './store/reducers/transactionsSlice';
import { setDate } from './store/reducers/dateSlice';

import { useDispatch, useSelector } from 'react-redux';

import './app.css';

const App = () => {

    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories);
    const transactions = useSelector(state => state.transactions);
    const date = useSelector(state => state.date)

    console.log(categories);
    console.log(transactions);

    useEffect(() => {
        getCategories();
        getTransactions();
    }, []);

    const getCategories = async () => {
        try {
          const response = await fetch('http://localhost:3001/categories');
          const data = await response.json();
          dispatch(setCategories(data));
        } catch (e) {
          console.error(e);
        }
      };

    const getTransactions = async () => {
        try {
            const response = await fetch('http://localhost:3001/transactions');
            const data = await response.json();
            dispatch(setTransactions(data));
        } catch (e) {
            console.error(e);
        }
    }

    const filteredDataOnDate = () => {
        if (transactions) {
            const filteredTransactions = transactions.filter(transaction => transaction.date === date);
            return filteredTransactions;
        } else {
            return [];
        }
    }
    
    return (
        <div className="App">
            <input type="date" value={date} onChange={e => dispatch(setDate(e.target.value))}/>
            <header className="App-header">
                <CategoryList categories={categories}/>

                <TransactionsList transactions={filteredDataOnDate()} />

                <AddCategory getCategories={getCategories}/>

                <EditCategory getCategories={getCategories}/>

                <AddTransaction getTransactions={getTransactions}/>

                <EditTransaction getTransactions={getTransactions}/>

            </header>
        </div>
    );
};

export default App;

const AddCategory = ({ getCategories}) => {

    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState('');
    const [limit, setLimit] = useState(0);

    const createObj = async() => {
        
        try {
            const obj = {
                "id": `${uuidv4()}`,
                "title": `${category}`,
                "limit": `${limit}`
            }

            await fetch('http://localhost:3001/categories', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(obj),
            });
            
            await getCategories();

        } catch (error) {
        console.error('Помилка при виконанні POST-запиту:', error);
        }
    }
    
    return (
        <nav>
            <button className="modal-btn" onClick={() => setOpen(true)}>Додати категорію</button>
            {open ? <div className="overlay">
                <div className="modal">
                    
                    <label htmlFor='name'>Категорія:</label>
                    <input 
                        type="text" 
                        name='name' 
                        value={category} 
                        onChange={e => setCategory(e.target.value)}
                        placeholder='Введіть назву категорії'/>
                    <label htmlFor='name'>Ліміт:</label>
                    <input 
                        type="text" 
                        name='name' 
                        value={limit} 
                        onClick={() => {
                            limit === 0 ? setLimit('') : setLimit(limit)
                        }}
                        onChange={e => setLimit(e.target.value)}
                        placeholder='Введіть ліміт коштів'/>

                    <button type='submit' onClick={e => {
                        e.preventDefault();
                        createObj()
                        }
                    }>Додати</button>

                    <button className='modal-close' onClick={() => setOpen(false)}>X</button>
                </div>
            </div> : null}
        </nav>  
    )
}

const EditCategory = ({ getCategories }) => {

    const [open, setOpen] = useState(false);

    const categories = useSelector((state) => state.categories);

    return (
        <nav>
            <button className="modal-btn" onClick={() => setOpen(true)}>
            Редагувати категорію
            </button>
            {open ? (
            <div className="overlay">
                <div className="modal">
                {categories.map((category) => {
                    return (
                        <CategoryItem 
                            category={category} getCategories={getCategories} key={category.id}
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

const CategoryItem = ({category, getCategories}) => {

    const [categoryName, setCategoryName] = useState(category.title)
    const [limit, setLimit] = useState(category.limit);
  
    const editCategory = async (categoryID) => {
        try {
            const obj = {
                id: `${categoryID}`,
                title: `${categoryName}`,
                limit: `${limit}`
            };
    
            await fetch(`http://localhost:3001/categories/${categoryID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj),
            });
    
            await getCategories();

        } catch (error) {
            console.error('Помилка при виконанні PUT-запиту:', error);
        }
    };

    const deleteCategory = async (categoryID) => {
        try{
            const obj = {
                id: `${categoryID}`,
                title: `${categoryName}`,
                limit: `${limit}`
            };

            await fetch(`http://localhost:3001/categories/${categoryID}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj),
            });
    
            await getCategories();

        } catch (error) {
            console.error('Помилка при виконанні DELETE-запиту:', error);
        }
    }

    return (
        <div className="category" key={category.id}>
            <input
                type="text"
                value={categoryName}
                onChange={(e) => {
                    setCategoryName(e.target.value)
                }}
            />

            <input
                type="number"
                value={limit}
                onChange={(e) => {
                    setLimit(e.target.value)
                }}
            />
            <button
                type="submit"
                onClick={(e) => {
                    e.preventDefault();
                    editCategory(category.id);
                }}
            >
            Редагувати
            </button>
            <button
                type="button"
                onClick={(e) => {
                    e.preventDefault();
                    deleteCategory(category.id);
                }}
            >
            del
            </button>
        </div>
    )
}

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
  
const EditTransaction = ({ getTransactions }) => {

    const [open, setOpen] = useState(false);
    
    const transactions = useSelector((state) => state.transactions)

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
                            transaction={transaction} getTransactions={getTransactions} key={transaction.id}
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

const TransactionItem = ({transaction, getTransactions}) => {

    const [transactionName, setTransactionName] = useState(transaction.name);
    const [transactionValue, setTransactionValue] = useState(transaction.value);
    const [transactionCategory, setTransactionCategory] = useState(transaction.category);
    const [transactionDate, setTransactionDate] = useState(transaction.date);
  
    const editTransaction = async (transactionID) => {
        try {
            const obj = {
                "id": `${transactionID}`,
                "name": `${transactionName}`,
                "value": `${transactionValue}`,
                "categoryID": `${transactionCategory}`,
                "date": `${transactionDate}`
            }
    
            await fetch(`http://localhost:3001/transactions/${transactionID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj),
            });
    
            await getTransactions();
        } catch (error) {
            console.error('Помилка при виконанні PUT-запиту:', error);
        }
    };

    const deleteTransaction = async (transactionID) => {
        try{
            const obj = {
                "id": `${transactionID}`,
                "name": `${transactionName}`,
                "value": `${transactionValue}`,
                "categoryID": `${transactionCategory}`,
                "date": `${transactionDate}`
            };

            await fetch(`http://localhost:3001/transactions/${transactionID}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj),
            });
    
            getTransactions();

        } catch (error) {
            console.error('Помилка при виконанні DELETE-запиту:', error);
        }
    }

    return (
        <div className="transaction" key={transaction.id}>
            <div className="transaction_change-list">
                <input
                    type="text"
                    value={transactionName}
                    onChange={(e) => {
                        setTransactionName(e.target.value)
                    }}
                />

                <input
                    type="number"
                    value={transactionValue}
                    onChange={(e) => {
                        setTransactionValue(e.target.value)
                    }}
                />

                <input
                    type="text"
                    value={transactionCategory}
                    onChange={(e) => {
                        setTransactionCategory(e.target.value)
                    }}
                />

                <input
                    type="date"
                    value={transactionDate}
                    onChange={(e) => {
                        setTransactionDate(e.target.value)
                    }}
                />
                
            </div>

            <button
                type="submit"
                onClick={(e) => {
                    e.preventDefault();
                    editTransaction(transaction.id);
                }}>Редагувати</button>

            <button
                type="button"
                onClick={(e) => {
                    e.preventDefault();
                    deleteTransaction(transaction.id);
            }}>del</button>
            
            
        </div>
    )
}