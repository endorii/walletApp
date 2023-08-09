import axios from "axios";

export const addTransaction = async (name, value, category, date) => {
    try {
        const response = await axios.post("http://localhost:5000/api/transactions", {name, value, category, date}, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});
        return response.data
    } catch (e) {
        console.log(e.response.data.message);
    }   
}

export const getAllTransactions = async () => {
    try {
        const response = await axios.get("http://localhost:5000/api/transactions", {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});
        return response.data.transactions
    } catch (e) {
        console.log(e.response.data.message);
    }   
}

export const editTransactionItem = async (id, name, value, category, date) => {
    try {
        const response = await axios.put(`http://localhost:5000/api/transactions/${id}`, {name, value, category, date}, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});
        return response.data
    } catch (e) {
        console.log(e.response.data.message);
    }
}

export const deleteTransactionsItem = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:5000/api/transactions/${id}`, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});
        return response.data
    } catch (e) {
        console.log(e.response.data.message);
    }
}