import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from "react-redux";
import { fetchCategories } from "../../../../store/reducers/categoriesSlice";

const AddCategory = () => {

    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState('');
    const [limit, setLimit] = useState(0);

    const dispatch = useDispatch();

    const createObj = async() => {
        
        try {
            const obj = {
                "id": `${uuidv4()}`,
                "label": `${category}`,
                "limit": `${limit}`
            }

            await fetch('http://localhost:3001/categories', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(obj),
            });
            
            dispatch(fetchCategories())

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
};

export default AddCategory;