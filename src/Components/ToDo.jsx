import React, { useEffect, useState } from 'react'

export default function ToDo() {
    const [Input , setInput] = useState('');
    const [AddItems , setAddItems] = useState([]);
    const [ToggleIcon , setToggle] = useState(true);
    const [EditItem , setEditItem] = useState(null);

     useEffect(()=>{
       getLocalTodo();
     },[]);
    useEffect(()=>{
       saveLocalTodo();
    },[AddItems]);

    const saveLocalTodo = ()=>{
          localStorage.setItem('todos' , JSON.stringify(AddItems));
 } 
    const getLocalTodo = ()=>{
           if(localStorage.getItem('todos') === null){
             localStorage.setItem('todos' , JSON.stringify([]));
           }
           else{
           let localData = JSON.parse(localStorage.getItem('todos'));
           setAddItems(localData);
           }
    }
    const AddHandlers = ()=>{
        if(!Input){
        alert("Empty data not added");
        }else if(Input && !ToggleIcon){
              setAddItems(AddItems.map((item)=>{
                        if(item.id === EditItem){
                            return{
                                ...item ,
                                name:Input
                            }}
                            return item;
              }))
             setToggle(true);
             setInput("");
             setEditItem(null);
        }else{
            const allInputData = {id: new Date().getTime().toString() , name:Input }
            setAddItems([
                ...AddItems,
                allInputData
            ])
        }
      
          setInput('');
    } 
    const handleDelete = (index)=>{
        setAddItems(AddItems.filter((item,id)=>{
            return   item.id !== index;
        }
         ));
        
    }
    const handleRemove = ()=>{
          setAddItems([]);
    }
    const handleEdit = (id)=>{
      let newEditItem = AddItems.find((item)=>{
            return item.id === id;
      });
     // console.log(newEditItem);
      setToggle(false);
      setInput(newEditItem.name);
      setEditItem(id);
    }
    return (
        <div className='main-div'> 
          <div className="child-div">
              <div className='crud'>crud Operation in Todo</div>
              <div className="addItems">
                  <input type="text" placeholder="Add items" autoComplete="off" id="" value={Input} onChange={(e)=> setInput(e.target.value)} /> 
                  <i className={`fas ${ToggleIcon ? "fa-plus" : "fa-edit"}        add-btn`} onClick={AddHandlers} title={`${ToggleIcon ? "Add" : "Edit"} Items`}></i>)  
               </div> 
               <div className="showItems">
                   {
                       AddItems.map((item)=>{
                           return (
                            <div className="eachItem fall" key={item.id}>
                                    <h3>{item.name}</h3>
                                <div className="todo-btn">
                                    <i className="far fa-edit  add-btn" title="Edit Items" onClick={()=>handleEdit(item.id)}></i>
                                    <i className="far fa-trash-alt   add-btn" title="Delete Items" onClick={()=>handleDelete(item.id)}></i>
                                 </div>
                                    
                             </div>
                           )
                       })
                   }
               </div>
               <div className="showItems">
                  <button className="btn effect04" onClick={handleRemove} data-sm-link-text="Remove All" ><span>CHECK LIST</span></button>
               </div>
           </div> 
        </div>
    )
}
