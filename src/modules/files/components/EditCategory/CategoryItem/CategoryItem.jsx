import { useState } from "react";

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
};

export default CategoryItem;