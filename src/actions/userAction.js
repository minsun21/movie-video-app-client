import axios from 'axios';
import { LOGIN_USER } from './type'

export function loginUser(loginInfo) {
    const request = axios.post('/user/login', loginInfo).then(response => response.data);

    return {
        type: LOGIN_USER,
        payload: request
    }
}
