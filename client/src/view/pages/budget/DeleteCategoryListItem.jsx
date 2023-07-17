import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCategories } from "../../../store/reducers/categoriesSlice";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const DeleteCategoryListItem = ({activeCategory}) => {

    const [categoryName, setCategoryName] = useState(activeCategory.label)
    const [limit, setLimit] = useState(activeCategory.limit);
    const [categoryID, setCategoryID] = useState(activeCategory.id)

    const dispatch = useDispatch();

    useEffect(() => {
        setCategoryName(activeCategory.label);
        setLimit(activeCategory.limit);
        setCategoryID(activeCategory.id);
    }, [activeCategory]);

    const deleteCategory = async (categoryID) => {
        try{
            const obj = {
                'id': `${categoryID}`,
                'label': `${categoryName}`,
                'limit': `${limit}`
            };

            await fetch(`http://localhost:3001/categories/${categoryID}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj),
            });
    
            dispatch(fetchCategories());

        } catch (error) {
            console.error('Помилка при виконанні DELETE-запиту:', error);
        }
    }
    return (
        <Box>
            <IconButton aria-label="delete" color='error' onClick={() => { deleteCategory(categoryID)}}>
                <DeleteIcon />
            </IconButton>
        </Box>
    )
}

export default DeleteCategoryListItem;