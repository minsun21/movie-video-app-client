import React, { useState } from 'react'
import './VideoUploadPage.css';
import Dropzone from 'react-dropzone';
import { PrivateList, CategoryList } from './Data';
import axios from 'axios'
import { useSelector } from 'react-redux';
import { getUrl } from '../../../utils/Util';

function VideoUploadPage(props) {
    const userInfo = useSelector(state => state.user.loginInfo);

    const [inputs, setInputs] = useState({
        Title: '',
        Desc: ''
    });
    const { Title, Desc } = inputs;
    const [Private, setPrivate] = useState('0');
    const [Category, setCategory] = useState('1');
    const [VideoFile, setVideoFile] = useState('');
    const [Image, setImage] = useState('');

    const inputChangeHandler = (e) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    }

    const onPrivateChange = (e) => {
        setPrivate(e.currentTarget.value)
    }
    const onCategoryChange = (e) => {
        setCategory(e.currentTarget.value)
    }
    const onDrop = (files) => {
        let formData = new FormData;
        formData.append("file", files[0]);
        axios.post('/video/upload', formData, {
            headers: {
                contentType: "multipart/form-data",
            },
        }).then(response => {
            if (response.data.result === "success") {
                const url = getUrl(response.data.bytes, 'jpg');
                setVideoFile(response.data.uid)
                setImage(url);
                alert('업로드 성공')
            } else {
                alert('업로드 실패')
            }
        })
    }

    const submitVideo = (e) => {
        e.preventDefault();
        let videoInfo = {
            title: Title,
            desc: Desc,
            auth: Private,
            category: Category,
            path: VideoFile,
            user: userInfo.email
        }

        axios.post('/video/submit', videoInfo).then(response => {
            if (response.data.result === 'success') {
                alert('업로드에 성공했습니다')
                window.URL.revokeObjectURL(Image);
                props.history.push('/video')
            } else {
                alert('업로드에 실패했습니다')
            }
        })
    }

    return (
        <>
            <div className="video-upload">
                <form onSubmit={submitVideo}>
                    <div className="dropzone">
                        <Dropzone
                            onDrop={onDrop}
                            multiple={false}
                            maxSize={800000000}>
                            {({ getRootProps, getInputProps }) => (
                                <div style={{ width: '50%', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                    {...getRootProps()}
                                >
                                    <input {...getInputProps()} />
                            +
                                </div>
                            )}
                        </Dropzone>
                        {Image && <img src={Image} alt="Blob URL Image" />}
                    </div>
                    <label>Title</label>
                    <input required type="text" name="Title" value={Title} onChange={inputChangeHandler}></input>
                    <label>Description</label>
                    <input required type="textarea" name="Desc" value={Desc} onChange={inputChangeHandler}></input>
                    <select onChange={onPrivateChange}>
                        {PrivateList.map((item, index) => (
                            <option key={index} value={item.value}>{item.label}</option>
                        ))}
                    </select>
                    <select onChange={onCategoryChange}>
                        {CategoryList.map((item, index) => (
                            <option key={index} value={item.value}>{item.label}</option>
                        ))}
                    </select>
                    <button className="submit-button" type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}

export default VideoUploadPage
