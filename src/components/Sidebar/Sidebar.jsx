import React from 'react'
import './Sidebar.css'
import { useNavigate } from 'react-router-dom';
import { AiTwotoneHome, AiFillAlert , AiOutlineLineChart  } from "react-icons/ai";

const Sidebar = () => {

    const navigate = useNavigate();

    const handleClick = (screen) => {
        navigate(screen);
    };

    return (
        <div className='SideBar'>
            <div className='buttons'>
                <button onClick={() => handleClick('/')} type="button"><AiTwotoneHome /></button>
                <button onClick={() => handleClick('/discipline')} type="button"><AiOutlineLineChart /></button>
                <button onClick={() => handleClick('/page')} type="button"><AiFillAlert  /></button>
            </div>
        </div>
    )
}

export default Sidebar
