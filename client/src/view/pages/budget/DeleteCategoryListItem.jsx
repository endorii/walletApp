import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCategories } from "../../../store/reducers/categoriesSlice";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteCategoryItem } from "../../../modules/files/actions/category";

const DeleteCategoryListItem = ({activeCategory}) => {

    const dispatch = useDispatch();

    const [categoryID, setCategoryID] = useState(activeCategory._id)

    const deleteCategory = async (categoryID) => {
        try{
            await deleteCategoryItem(categoryID);
    
            dispatch(fetchCategories());

        } catch (error) {
            console.error('Помилка при виконанні DELETE-запиту:', error);
        }
    }

    useEffect(() => {
        setCategoryID(activeCategory._id);
    }, [activeCategory]);

    return (
        <Box>
            <IconButton aria-label="delete" color='error' onClick={() => { deleteCategory(categoryID)}}>
                <DeleteIcon />
            </IconButton>
        </Box>
    )
}

export default DeleteCategoryListItem;