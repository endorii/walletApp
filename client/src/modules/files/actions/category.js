import axios from "axios";

export const addCategory = async (label, limit, type) => {
    try {
        const response = await axios.post("http://localhost:5000/api/categories", {label, limit, type}, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});
        return response.data
    } catch (e) {
        console.log(e.response.data.message);
    }   
}

export const getAllCategories = async () => {
    try {
        const response = await axios.get("http://localhost:5000/api/categories", {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});
        return response.data.categories
    } catch (e) {
        console.log(e.response.data.message);
    }   
}

export const editCategoryItem = async (id, label, limit, type) => {
    try {
        const response = await axios.put(`http://localhost:5000/api/categories/${id}`, {label, limit, type}, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});
        return response.data
    } catch (e) {
        console.log(e.response.data.message);
    }
}

export const deleteCategoryItem = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:5000/api/categories/${id}`, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});
        return response.data
    } catch (e) {
        console.log(e.response.data.message);
    }
}