import React, { useState } from 'react';
import './RegisterPage.css';
import axios from 'axios';

function RegisterPage(props) {
    const [inputs, setInputs] = useState({
        Email: '',
        Name: '',
        Password: '',
        PasswordConfirm: ''
    });
    const { Email, Password, Name, PasswordConfirm } = inputs;
    const inputChangeHandler = (e) => {
        const { value, name } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if (Password !== PasswordConfirm)
            alert('비밀번호가 맞지 않습니다')
        let registerInfo = {
            email: Email,
            password: Password,
            name: Name
        }
        axios.post('/user/register', registerInfo).then(response => response.data);
    }

    return (
        <div className="register-form">
            <form onSubmit={submitHandler}>
                <label>Email</label>
                <input required type="email" name="Email" value={Email} onChange={inputChangeHandler} />
                <label>Name</label>
                <input required type="text" name="Name" value={Name} onChange={inputChangeHandler} />
                <label>Password</label>
                <input required type="password" name="Password" value={Password} onChange={inputChangeHandler} />
                <label>Password Confirm</label>
                <input required type="password" name="PasswordConfirm" value={PasswordConfirm} onChange={inputChangeHandler} />
                <button type="submit">JOIN</button>
            </form>
        </div>
    )
}

export default RegisterPage
