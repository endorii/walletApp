import { useState } from "react";
import { useSelector } from "react-redux";
import CategoryItem from "./CategoryItem/CategoryItem";

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

export default EditCategory;