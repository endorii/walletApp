import React from 'react';

const CategoryList = ({categories}) => {

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
                <p>Назва: {category.title}</p>
                <p>Ліміт: {category.limit}</p>
            </li>
            ))}
        </ul>
        </div>
    );
};

export default CategoryList;
