import { useState } from "react";
import { fetchCategories } from "../../../../../store/reducers/categoriesSlice";

import { useDispatch } from "react-redux";

const CategoryItem = ({category}) => {

    const [categoryName, setCategoryName] = useState(category.label)
    const [limit, setLimit] = useState(category.limit);
    const dispatch = useDispatch;

    const editCategory = async (label) => {
        try {
            const obj = {
                id: `${label}`,
                label: `${categoryName}`,
                limit: `${limit}`
            };
    
            await fetch(`http://localhost:3001/categories/${label}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj),
            });
    
            dispatch(fetchCategories());

        } catch (error) {
            console.error('Помилка при виконанні PUT-запиту:', error);
        }
    };

    const deleteCategory = async (label) => {
        try{
            const obj = {
                id: `${label}`,
                label: `${categoryName}`,
                limit: `${limit}`
            };

            await fetch(`http://localhost:3001/categories/${label}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj),
            });
    
            dispatch(fetchCategories())

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
};

export default CategoryItem;