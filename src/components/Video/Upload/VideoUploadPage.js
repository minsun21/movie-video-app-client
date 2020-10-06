import React, { useState } from 'react'
import './VideoUploadPage.css';
import Dropzone from 'react-dropzone';
import { PrivateList, CategoryList } from './Data';
import axios from 'axios'

function VideoUploadPage(props) {
    const [inputs, setInputs] = useState({
        Title: '',
        Desc: ''
    });
    const { Title, Desc } = inputs;
    const [Private, setPrivate] = useState('')
    const [Category, setCategory] = useState('')
    const [VideoFile, setVideoFile] = useState('')
    const [Image, setImage] = useState('')

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
        const config = {
            header: {
                'response-type': 'arraybuffer',
                'content-type': 'multipart/form-data'
            }
        }
        formData.append("file", files[0])
        axios.post('/video/upload', formData, config).then(response => {
            // response.data is an empty object
            const blob = new Blob([response.data], {
                type: 'application/jpg',
            });
            const url = URL.createObjectURL(blob);
            console.log(url)
            setImage(url)
            // if (response.data.result === 'success') {
            //     setVideoFile(files[0].name)
            //     const blob = new Blob([response.data], {
            //         type: 'application/jpg',
            //     });
            //     const url = URL.createObjectURL(blob);
            //     console.log(url);
            //     setImage(url);
            // } else {
            //     alert('업로드에 실패했습니다')
            // }
        })
    }

    const submitVideo = () => {
        let videoInfo = {
            title: Title,
            desc: Desc,
            auth: Private,
            category: Category,
            path: VideoFile
        }
        axios.post('/video/uploadInfo', videoInfo).then(response => {
            if (response.data.result === 'success') {
                alert('업로드에 성공했습니다')
                // window.URL.revokeObjectURL(Image);
                props.push('/video')
            } else {
                alert('업로드에 실패했습니다')
            }
        })
    }
    return (
        <>
            <div className="video-upload">
                <h1>Upload Video</h1>
                <form onSubmit={submitVideo}>
                    <div className="dropzone">
                        <Dropzone
                            onDrop={onDrop}
                            multiple={false}
                            maxSize={800000000}>
                            {({ getRootProps, getInputProps }) => (
                                <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                    {...getRootProps()}
                                >
                                    <input {...getInputProps()} />
                            +
                                </div>
                            )}
                        </Dropzone>
                        <img src={Image} alt="Blob URL Image" />
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
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}

export default VideoUploadPage
