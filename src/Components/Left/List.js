import React from 'react'
import { IoMdClose } from "react-icons/io"


const List = ({ onDelete, list }) => {
    
    return (
        <li>
            <span>{list} <IoMdClose onClick={onDelete} /></span>
        </li>
    )
}

export default List
