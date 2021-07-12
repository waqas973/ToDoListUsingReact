import React from 'react'

export default function ToDoLists(props) {
   const handleDelete = ()=>{
    props.deleteItems(props.id);
   }
    return (
        <>
          <li><button onClick={handleDelete}>X</button> <span>{props.itemVal}</span> </li>   
        </>
    )
}
