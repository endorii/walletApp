import React from 'react';
import { useSelector } from 'react-redux';

const CategoryList = () => {

    const {categories} = useSelector(state => state.categories);

    if (!categories || categories.length === 0) {
        return <p>Немає доступних категорій.</p>;
    }

    return (
        <div>
        <h2>Категорії</h2>
        <ul>
            {categories.map((category) => (
            <li key={category.id}>
                <p>ID: {category.id}</p>
                <p>Назва: {category.label}</p>
                <p>Ліміт: {category.limit}</p>
            </li>
            ))}
        </ul>
        </div>
    );
};

export default CategoryList;
