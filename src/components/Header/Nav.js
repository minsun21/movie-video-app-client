import React from 'react'
import { Link } from "react-router-dom";

function Nav() {
    return (
        <>
            <ul className="nav">
                <li>
                    <Link className="link" to="/">Home</Link>
                </li>
                <li>
                    <Link className="link" to="/movie">Movie</Link>
                </li>
                <li>
                    <Link className="link" to="/video">Video</Link>
                </li>
                <li>
                    <Link className="link" to="/video/upload">Video Upload</Link>
                </li>
                <li>
                    <Link className="link" to="/video/subscriptoin">My Subscribe</Link>
                </li>
            </ul>
            <button>LOGOUT</button>
        </>
    )
}

export default Nav
