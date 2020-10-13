import React, { useState } from 'react';
import './RegisterPage.css';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import { base64ToArrayBuffer } from '../../utils/Util';

function RegisterPage(props) {
    const [Image, setImage] = useState('');
    const [Avatar, setAvatar] = useState();
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
            name: Name,
            image: Avatar,
        }
        axios.post('/user/register', registerInfo).then(response => {
            if (response.data.result !== 'success') {
                alert(response.data.result)
            } else {
                alert('회원 가입이 완료 되었습니다')
                props.history.push('/')
            }
        });
    }
    const onDrop = (files) => {
        let formData = new FormData;
        formData.append("file", files[0])
        axios.post('/user/register/image', formData, {
            headers: {
                contentType: "multipart/form-data",
            },
        }).then(response => {
            if (response.data.result === 'success') {
                var buffer = base64ToArrayBuffer(response.data.bytes);
                const blob = new Blob([buffer], {
                    type: 'application/jpg',
                });
                const url = URL.createObjectURL(blob);
                setImage(url);
                setAvatar(response.data.uid);
            } else {
                alert('이미지 업로드 실패')
            }
        })
    }

    const deleteImage = () => {
        let body = { image: Avatar }
        axios.post('/user/register/delete', body);
        setImage('');
        setAvatar('');
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
                <div>
                    {Image && <img style={{ width: '100%', marginBottom: '10px', }} src={Image} alt="Blob URL Image" />}
                    {Image ? <button onClick={deleteImage}>삭제</button> : <Dropzone
                        onDrop={onDrop}
                        multiple={false}
                        maxSize={100000}>
                        {({ getRootProps, getInputProps }) => (
                            <div style={{ width: '100%', height: '150px', marginBottom: '10px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                {...getRootProps()}
                            >
                                <input {...getInputProps()} />
                            +
                            </div>
                        )}
                    </Dropzone>}

                </div>

                <button type="submit">JOIN</button>
            </form>
        </div>
    )
}

export default RegisterPage
