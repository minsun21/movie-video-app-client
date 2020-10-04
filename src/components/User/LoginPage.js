import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { loginUser } from '../../actions/userAction';
import './LoginPage.css'

function LoginPage(props) {
    const dispatch = useDispatch();

    const [inputs, setInputs] = useState({
        Email: '',
        Password: ''
    });
    const { Email, Password } = inputs;
    const inputChangeHandler = (e) => {
        const { value, name } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    }

    const submitHandler = (e) => {
        e.preventDefault();
        let loginInfo = {
            email: Email,
            password: Password
        }
        dispatch(loginUser(loginInfo)).then(response => {
            console.log(response.payload);
            if (response.payload.loginSuccess === 'success') {
                localStorage.setItem("loginInfo", response.payload.email);
                props.history.push('/movie')
            } else {
                alert(response.payload.loginSuccess);
            }
        })
    }
    return (
        <div className="login-form">
            <form onSubmit={submitHandler}>
                <label>Email</label>
                <input required type="email" name="Email" value={Email} onChange={inputChangeHandler} />
                <label>Password</label>
                <input required type="password" name="Password" value={Password} onChange={inputChangeHandler} />
                <button type="submit">Login</button>
                <a href="/register">JOIN!</a>
            </form>
        </div>
    )
}

export default LoginPage;