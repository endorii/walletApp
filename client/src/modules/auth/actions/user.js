import axios from "axios";
import { setUser } from "../../../store/reducers/userSlice";
import Swal from 'sweetalert2'

export const registration = async (email, password) => {
    try {
        const response = await axios.post("http://localhost:5000/api/auth/registration", {email, password});
    } catch (e) {
        Swal.fire({
            title: e.response.data.message,
            icon: 'warning',
            confirmButtonText: 'Продовжити'
        })
    }   
}

export const login = (email, password) => {
    return async dispatch => {
        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", {email, password});
            dispatch(setUser(response.data.user));
            localStorage.setItem('token', response.data.token);
        } catch (e) {
            Swal.fire({
                title: e.response.data.message,
                icon: 'warning',
                confirmButtonText: 'Продовжити'
            })
        }       
    }
}

export const auth = () => {
    return async dispatch => {
        try {
            const response = await axios.get("http://localhost:5000/api/auth/auth", {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});
            dispatch(setUser(response.data.user));
            localStorage.setItem('token', response.data.token);
        } catch (e) {
            // Swal.fire({
            //     title: e.response.data.message,
            //     icon: 'warning',
            //     confirmButtonText: 'Продовжити'
            // })
            console.log(e.response.data.message);
            localStorage.removeItem('token');
        }       
    }
}