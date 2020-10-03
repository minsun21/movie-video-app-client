import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { loginUser } from '../../actions/userAction';

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
            [name]: value
        });
    }

    const submitHandler = (e) => {

        e.preventDefault();
        if (Email.length < 0 || Password < 0)
            alert('값을 입력해주세요!')
        let loginInfo = {
            email: Email,
            password: Password
        }
        dispatch(loginUser(loginInfo)).then(response => {
            if (response.payload.loginSuccess === 'success') {
                props.history.push('/main')
            } else {
                alert('Error');
            }
        })
    }
    return (
        <div>
            <form onSubmit={submitHandler}>
                <label>Email</label>
                <input type="email" name="Email" value={Email} onChange={inputChangeHandler} />
                <label>Password</label>
                <input type="password" name="Password" value={Password} onChange={inputChangeHandler} />
                <button type="submit">Login</button>
                <a href="/register">JOIN!</a>
            </form>
        </div>
    )
}

export default LoginPage;