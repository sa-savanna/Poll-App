import React from 'react'
import { IoMdClose } from "react-icons/io"
import { Button } from '@material-ui/core';


const List = ({ onDelete, list }) => {

    return (
        <>
            <li><span>{list}</span></li>
            <Button onClick={onDelete}> <IoMdClose /> </Button>
        </>

    )
}

export default List
